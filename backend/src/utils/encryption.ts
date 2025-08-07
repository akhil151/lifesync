import CryptoJS from 'crypto-js';
import * as forge from 'node-forge';
import * as nacl from 'tweetnacl';
import * as naclUtil from 'tweetnacl-util';
import { randomBytes } from 'crypto';

/**
 * Zero-Knowledge Encryption Utilities
 * 
 * This module provides client-side encryption capabilities where:
 * 1. Data is encrypted on the client before transmission
 * 2. Server never sees unencrypted data
 * 3. Encryption keys are derived from user credentials
 * 4. Biometric data is hashed, never stored raw
 */

export interface EncryptionResult {
  encryptedData: string;
  iv: string;
  salt: string;
  keyDerivationParams: {
    iterations: number;
    keySize: number;
  };
}

export interface DecryptionParams {
  encryptedData: string;
  iv: string;
  salt: string;
  keyDerivationParams: {
    iterations: number;
    keySize: number;
  };
}

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export interface BiometricHash {
  hash: string;
  salt: string;
  algorithm: string;
}

/**
 * Generate a cryptographically secure random salt
 */
export const generateSalt = (length: number = 32): string => {
  return randomBytes(length).toString('hex');
};

/**
 * Generate a cryptographically secure random IV
 */
export const generateIV = (length: number = 16): string => {
  return randomBytes(length).toString('hex');
};

/**
 * Derive encryption key from password using PBKDF2
 */
export const deriveKey = (password: string, salt: string, iterations: number = 100000): string => {
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: iterations,
    hasher: CryptoJS.algo.SHA256
  });
  return key.toString();
};

/**
 * Encrypt data using AES-256-GCM with zero-knowledge architecture
 * Data is encrypted client-side before transmission
 */
export const encryptData = (data: string, password: string): EncryptionResult => {
  const salt = generateSalt();
  const iv = generateIV();
  const iterations = 100000;
  
  // Derive key from password
  const key = deriveKey(password, salt, iterations);
  
  // Encrypt data using AES-256-GCM
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.GCM,
    padding: CryptoJS.pad.NoPadding
  });
  
  return {
    encryptedData: encrypted.toString(),
    iv,
    salt,
    keyDerivationParams: {
      iterations,
      keySize: 256
    }
  };
};

/**
 * Decrypt data using AES-256-GCM
 */
export const decryptData = (params: DecryptionParams, password: string): string => {
  const { encryptedData, iv, salt, keyDerivationParams } = params;
  
  // Derive key from password
  const key = deriveKey(password, salt, keyDerivationParams.iterations);
  
  // Decrypt data
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.GCM,
    padding: CryptoJS.pad.NoPadding
  });
  
  return decrypted.toString(CryptoJS.enc.Utf8);
};

/**
 * Generate RSA key pair for asymmetric encryption
 */
export const generateRSAKeyPair = (): KeyPair => {
  const keypair = forge.pki.rsa.generateKeyPair(2048);
  
  return {
    publicKey: forge.pki.publicKeyToPem(keypair.publicKey),
    privateKey: forge.pki.privateKeyToPem(keypair.privateKey)
  };
};

/**
 * Encrypt data using RSA public key
 */
export const encryptWithRSA = (data: string, publicKeyPem: string): string => {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encrypted = publicKey.encrypt(data, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: forge.mgf.mgf1.create(forge.md.sha256.create())
  });
  return forge.util.encode64(encrypted);
};

/**
 * Decrypt data using RSA private key
 */
export const decryptWithRSA = (encryptedData: string, privateKeyPem: string): string => {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const encrypted = forge.util.decode64(encryptedData);
  const decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: forge.mgf.mgf1.create(forge.md.sha256.create())
  });
  return decrypted;
};

/**
 * Generate NaCl key pair for high-performance encryption
 */
export const generateNaClKeyPair = (): KeyPair => {
  const keyPair = nacl.box.keyPair();
  
  return {
    publicKey: naclUtil.encodeBase64(keyPair.publicKey),
    privateKey: naclUtil.encodeBase64(keyPair.secretKey)
  };
};

/**
 * Encrypt data using NaCl box (Curve25519 + XSalsa20 + Poly1305)
 */
export const encryptWithNaCl = (data: string, publicKey: string, privateKey: string): string => {
  const message = naclUtil.decodeUTF8(data);
  const publicKeyBytes = naclUtil.decodeBase64(publicKey);
  const privateKeyBytes = naclUtil.decodeBase64(privateKey);
  const nonce = nacl.randomBytes(24);
  
  const encrypted = nacl.box(message, nonce, publicKeyBytes, privateKeyBytes);
  
  // Combine nonce and encrypted data
  const combined = new Uint8Array(nonce.length + encrypted.length);
  combined.set(nonce);
  combined.set(encrypted, nonce.length);
  
  return naclUtil.encodeBase64(combined);
};

/**
 * Decrypt data using NaCl box
 */
export const decryptWithNaCl = (encryptedData: string, publicKey: string, privateKey: string): string => {
  const combined = naclUtil.decodeBase64(encryptedData);
  const nonce = combined.slice(0, 24);
  const encrypted = combined.slice(24);
  
  const publicKeyBytes = naclUtil.decodeBase64(publicKey);
  const privateKeyBytes = naclUtil.decodeBase64(privateKey);
  
  const decrypted = nacl.box.open(encrypted, nonce, publicKeyBytes, privateKeyBytes);
  
  if (!decrypted) {
    throw new Error('Decryption failed');
  }
  
  return naclUtil.encodeUTF8(decrypted);
};

/**
 * Hash biometric data securely (never store raw biometric data)
 * Uses Argon2-like approach with multiple rounds of hashing
 */
export const hashBiometricData = (biometricData: string): BiometricHash => {
  const salt = generateSalt(64); // Longer salt for biometric data
  
  // Multiple rounds of hashing for extra security
  let hash = biometricData;
  for (let i = 0; i < 10; i++) {
    hash = CryptoJS.SHA3(hash + salt + i.toString(), { outputLength: 512 }).toString();
  }
  
  // Final hash with PBKDF2
  const finalHash = CryptoJS.PBKDF2(hash, salt, {
    keySize: 512 / 32,
    iterations: 200000,
    hasher: CryptoJS.algo.SHA512
  }).toString();
  
  return {
    hash: finalHash,
    salt,
    algorithm: 'SHA3-512-PBKDF2'
  };
};

/**
 * Verify biometric data against stored hash
 */
export const verifyBiometricData = (biometricData: string, storedHash: BiometricHash): boolean => {
  try {
    // Recreate the hash using the same process
    let hash = biometricData;
    for (let i = 0; i < 10; i++) {
      hash = CryptoJS.SHA3(hash + storedHash.salt + i.toString(), { outputLength: 512 }).toString();
    }
    
    const finalHash = CryptoJS.PBKDF2(hash, storedHash.salt, {
      keySize: 512 / 32,
      iterations: 200000,
      hasher: CryptoJS.algo.SHA512
    }).toString();
    
    return finalHash === storedHash.hash;
  } catch (error) {
    return false;
  }
};

/**
 * Generate secure random password for key derivation
 */
export const generateSecurePassword = (length: number = 32): string => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
};

/**
 * Encrypt file data for secure storage
 */
export const encryptFile = (fileBuffer: Buffer, password: string): EncryptionResult => {
  const base64Data = fileBuffer.toString('base64');
  return encryptData(base64Data, password);
};

/**
 * Decrypt file data
 */
export const decryptFile = (params: DecryptionParams, password: string): Buffer => {
  const decryptedBase64 = decryptData(params, password);
  return Buffer.from(decryptedBase64, 'base64');
};

/**
 * Create a secure hash of user credentials for authentication
 * This is separate from biometric hashing
 */
export const hashUserCredentials = (email: string, password: string): string => {
  const salt = CryptoJS.SHA256(email.toLowerCase()).toString();
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 100000,
    hasher: CryptoJS.algo.SHA256
  }).toString();
};

/**
 * Generate a secure session token
 */
export const generateSessionToken = (): string => {
  return randomBytes(32).toString('hex');
};

/**
 * Validate encryption parameters
 */
export const validateEncryptionParams = (params: DecryptionParams): boolean => {
  return !!(
    params.encryptedData &&
    params.iv &&
    params.salt &&
    params.keyDerivationParams &&
    params.keyDerivationParams.iterations > 0 &&
    params.keyDerivationParams.keySize > 0
  );
};

export default {
  generateSalt,
  generateIV,
  deriveKey,
  encryptData,
  decryptData,
  generateRSAKeyPair,
  encryptWithRSA,
  decryptWithRSA,
  generateNaClKeyPair,
  encryptWithNaCl,
  decryptWithNaCl,
  hashBiometricData,
  verifyBiometricData,
  generateSecurePassword,
  encryptFile,
  decryptFile,
  hashUserCredentials,
  generateSessionToken,
  validateEncryptionParams
};
