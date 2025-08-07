import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import { pgPool } from '../config/database';
import {
  encryptData,
  decryptData,
  hashBiometricData,
  verifyBiometricData,
  generateRSAKeyPair,
  generateSessionToken,
  hashUserCredentials
} from '../utils/encryption';
import { logger } from '../utils/logger';

const router = express.Router();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 login attempts per windowMs
  message: 'Too many login attempts, please try again later.',
});

// Validation middleware
const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('firstName').trim().isLength({ min: 1 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 1 }).withMessage('Last name is required'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

/**
 * Register new user with zero-knowledge encryption
 * POST /api/auth/register
 */
router.post('/register', authLimiter, registerValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, firstName, lastName, masterKey } = req.body;

    // Check if user already exists
    const existingUser = await pgPool.query(
      'SELECT id FROM users WHERE email = $1 AND deleted_at IS NULL',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Hash password for authentication (separate from encryption)
    const passwordHash = await bcrypt.hash(password, 12);

    // Generate RSA key pair for the user
    const keyPair = generateRSAKeyPair();

    // Encrypt sensitive data client-side (simulated here for demo)
    // In production, this would be done on the client before sending
    const encryptedFirstName = encryptData(firstName, masterKey || password);
    const encryptedLastName = encryptData(lastName, masterKey || password);

    // Insert user into database
    const result = await pgPool.query(`
      INSERT INTO users (
        email,
        password_hash,
        encrypted_first_name,
        encrypted_last_name,
        encryption_salt,
        encryption_iv,
        key_derivation_iterations,
        created_at,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, email, created_at
    `, [
      email,
      passwordHash,
      encryptedFirstName.encryptedData,
      encryptedLastName.encryptedData,
      encryptedFirstName.salt,
      encryptedFirstName.iv,
      encryptedFirstName.keyDerivationParams.iterations
    ]);

    const user = result.rows[0];

    // Store user's encryption keys
    await pgPool.query(`
      INSERT INTO user_encryption_keys (
        user_id,
        key_type,
        public_key,
        encrypted_private_key,
        algorithm,
        key_size,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
    `, [
      user.id,
      'rsa',
      keyPair.publicKey,
      encryptData(keyPair.privateKey, masterKey || password).encryptedData,
      'RSA-2048',
      2048
    ]);

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        type: 'access'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Generate refresh token
    const refreshToken = generateSessionToken();
    const sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Store session
    await pgPool.query(`
      INSERT INTO user_sessions (
        user_id,
        session_token,
        refresh_token,
        ip_address,
        user_agent,
        expires_at,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
    `, [
      user.id,
      token,
      refreshToken,
      req.ip,
      req.get('User-Agent'),
      sessionExpiry
    ]);

    // Log successful registration
    await pgPool.query(`
      INSERT INTO user_activity_log (
        user_id,
        activity_type,
        description,
        ip_address,
        user_agent,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
    `, [
      user.id,
      'registration',
      'User account created successfully',
      req.ip,
      req.get('User-Agent')
    ]);

    logger.info(`New user registered: ${email}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          createdAt: user.created_at
        },
        token,
        refreshToken,
        publicKey: keyPair.publicKey
      }
    });

  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
});

/**
 * Login user with zero-knowledge authentication
 * POST /api/auth/login
 */
router.post('/login', loginLimiter, loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, biometricData } = req.body;

    // Get user from database
    const userResult = await pgPool.query(`
      SELECT
        id,
        email,
        password_hash,
        biometric_hash,
        biometric_salt,
        biometric_enabled,
        login_attempts,
        locked_until,
        last_login
      FROM users
      WHERE email = $1 AND deleted_at IS NULL
    `, [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const user = userResult.rows[0];

    // Check if account is locked
    if (user.locked_until && new Date() < new Date(user.locked_until)) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to too many failed attempts'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    // Verify biometric data if provided and enabled
    let isBiometricValid = true;
    if (user.biometric_enabled && biometricData) {
      isBiometricValid = verifyBiometricData(biometricData, {
        hash: user.biometric_hash,
        salt: user.biometric_salt,
        algorithm: 'SHA3-512-PBKDF2'
      });
    }

    if (!isPasswordValid || !isBiometricValid) {
      // Increment login attempts
      const newAttempts = (user.login_attempts || 0) + 1;
      const lockUntil = newAttempts >= 5 ? new Date(Date.now() + 30 * 60 * 1000) : null; // Lock for 30 minutes after 5 attempts

      await pgPool.query(`
        UPDATE users
        SET login_attempts = $1, locked_until = $2
        WHERE id = $3
      `, [newAttempts, lockUntil, user.id]);

      // Log failed attempt
      await pgPool.query(`
        INSERT INTO user_activity_log (
          user_id,
          activity_type,
          description,
          ip_address,
          user_agent,
          is_suspicious,
          risk_score,
          created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
      `, [
        user.id,
        'login_failed',
        'Failed login attempt',
        req.ip,
        req.get('User-Agent'),
        true,
        newAttempts * 20 // Increase risk score with attempts
      ]);

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    await pgPool.query(`
      UPDATE users
      SET login_attempts = 0, locked_until = NULL, last_login = CURRENT_TIMESTAMP
      WHERE id = $1
    `, [user.id]);

    // Generate tokens
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        type: 'access'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    const refreshToken = generateSessionToken();
    const sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Store session
    await pgPool.query(`
      INSERT INTO user_sessions (
        user_id,
        session_token,
        refresh_token,
        ip_address,
        user_agent,
        expires_at,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
    `, [
      user.id,
      token,
      refreshToken,
      req.ip,
      req.get('User-Agent'),
      sessionExpiry
    ]);

    // Get user's public key
    const keyResult = await pgPool.query(`
      SELECT public_key
      FROM user_encryption_keys
      WHERE user_id = $1 AND key_type = 'rsa' AND is_active = true
    `, [user.id]);

    // Log successful login
    await pgPool.query(`
      INSERT INTO user_activity_log (
        user_id,
        activity_type,
        description,
        ip_address,
        user_agent,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
    `, [
      user.id,
      'login',
      'Successful login',
      req.ip,
      req.get('User-Agent')
    ]);

    logger.info(`User logged in: ${email}`);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          lastLogin: user.last_login
        },
        token,
        refreshToken,
        publicKey: keyResult.rows[0]?.public_key
      }
    });

  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
});

/**
 * Biometric login endpoint
 * POST /api/auth/biometric-login
 */
router.post('/biometric-login', loginLimiter, async (req, res) => {
  try {
    const { email, biometricData } = req.body;

    if (!email || !biometricData) {
      return res.status(400).json({
        success: false,
        message: 'Email and biometric data are required'
      });
    }

    // Get user with biometric data
    const userResult = await pgPool.query(`
      SELECT
        id,
        email,
        biometric_hash,
        biometric_salt,
        biometric_enabled,
        login_attempts,
        locked_until
      FROM users
      WHERE email = $1 AND deleted_at IS NULL AND biometric_enabled = true
    `, [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Biometric authentication not available for this account'
      });
    }

    const user = userResult.rows[0];

    // Check if account is locked
    if (user.locked_until && new Date() < new Date(user.locked_until)) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked'
      });
    }

    // Verify biometric data
    const isBiometricValid = verifyBiometricData(biometricData, {
      hash: user.biometric_hash,
      salt: user.biometric_salt,
      algorithm: 'SHA3-512-PBKDF2'
    });

    if (!isBiometricValid) {
      // Increment login attempts
      const newAttempts = (user.login_attempts || 0) + 1;
      const lockUntil = newAttempts >= 3 ? new Date(Date.now() + 60 * 60 * 1000) : null; // Lock for 1 hour after 3 biometric failures

      await pgPool.query(`
        UPDATE users
        SET login_attempts = $1, locked_until = $2
        WHERE id = $3
      `, [newAttempts, lockUntil, user.id]);

      return res.status(401).json({
        success: false,
        message: 'Biometric authentication failed'
      });
    }

    // Reset login attempts and update last login
    await pgPool.query(`
      UPDATE users
      SET login_attempts = 0, locked_until = NULL, last_login = CURRENT_TIMESTAMP
      WHERE id = $1
    `, [user.id]);

    // Generate tokens
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        type: 'access',
        authMethod: 'biometric'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    const refreshToken = generateSessionToken();
    const sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Store session
    await pgPool.query(`
      INSERT INTO user_sessions (
        user_id,
        session_token,
        refresh_token,
        ip_address,
        user_agent,
        expires_at,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
    `, [
      user.id,
      token,
      refreshToken,
      req.ip,
      req.get('User-Agent'),
      sessionExpiry
    ]);

    // Log successful biometric login
    await pgPool.query(`
      INSERT INTO user_activity_log (
        user_id,
        activity_type,
        description,
        ip_address,
        user_agent,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
    `, [
      user.id,
      'biometric_login',
      'Successful biometric login',
      req.ip,
      req.get('User-Agent')
    ]);

    logger.info(`Biometric login successful: ${email}`);

    res.json({
      success: true,
      message: 'Biometric login successful',
      data: {
        user: {
          id: user.id,
          email: user.email
        },
        token,
        refreshToken
      }
    });

  } catch (error) {
    logger.error('Biometric login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during biometric login'
    });
  }
});

export default router;
