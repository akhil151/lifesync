-- Digital Legacy Platform - Users Table with Zero-Knowledge Encryption Support
-- This table stores user authentication data with encrypted sensitive information

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table with zero-knowledge encryption support
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Hashed password (never store plain text)
    
    -- Encrypted personal information (client-side encrypted before storage)
    encrypted_first_name TEXT, -- AES-256 encrypted
    encrypted_last_name TEXT,  -- AES-256 encrypted
    encrypted_phone TEXT,      -- AES-256 encrypted
    
    -- Encryption metadata (for client-side decryption)
    encryption_salt VARCHAR(255), -- Salt used for key derivation
    encryption_iv VARCHAR(255),   -- Initialization vector
    key_derivation_iterations INTEGER DEFAULT 100000,
    
    -- Biometric authentication (hashed, never store raw biometric data)
    biometric_hash TEXT,           -- Secure hash of biometric data
    biometric_salt VARCHAR(255),   -- Salt for biometric hashing
    biometric_enabled BOOLEAN DEFAULT FALSE,
    
    -- Two-factor authentication
    totp_secret VARCHAR(255),      -- TOTP secret (encrypted)
    totp_enabled BOOLEAN DEFAULT FALSE,
    backup_codes TEXT[],           -- Encrypted backup codes
    
    -- Security settings
    security_questions JSONB,      -- Encrypted security questions and answers
    login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP,
    last_login TIMESTAMP,
    last_password_change TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Account status
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    
    -- Privacy and preferences
    privacy_settings JSONB DEFAULT '{}',
    notification_preferences JSONB DEFAULT '{}',
    
    -- Audit fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP, -- Soft delete
    
    -- Constraints
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT password_hash_not_empty CHECK (LENGTH(password_hash) > 0)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_users_last_login ON users(last_login);
CREATE INDEX IF NOT EXISTS idx_users_deleted_at ON users(deleted_at) WHERE deleted_at IS NULL;

-- User sessions table for secure session management
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    refresh_token VARCHAR(255) UNIQUE,
    
    -- Session metadata
    ip_address INET,
    user_agent TEXT,
    device_fingerprint VARCHAR(255),
    
    -- Security
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP NOT NULL,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Audit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT session_expires_future CHECK (expires_at > created_at)
);

-- Indexes for sessions
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON user_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON user_sessions(is_active) WHERE is_active = TRUE;

-- User activity log for security monitoring
CREATE TABLE IF NOT EXISTS user_activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Activity details
    activity_type VARCHAR(100) NOT NULL, -- login, logout, password_change, etc.
    description TEXT,
    
    -- Request metadata
    ip_address INET,
    user_agent TEXT,
    request_path VARCHAR(500),
    request_method VARCHAR(10),
    
    -- Security flags
    is_suspicious BOOLEAN DEFAULT FALSE,
    risk_score INTEGER DEFAULT 0, -- 0-100 risk assessment
    
    -- Timestamp
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_activity_user_id (user_id),
    INDEX idx_activity_type (activity_type),
    INDEX idx_activity_created (created_at),
    INDEX idx_activity_suspicious (is_suspicious) WHERE is_suspicious = TRUE
);

-- User encryption keys table (for RSA key pairs)
CREATE TABLE IF NOT EXISTS user_encryption_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Key information
    key_type VARCHAR(50) NOT NULL, -- 'rsa', 'nacl', etc.
    public_key TEXT NOT NULL,
    encrypted_private_key TEXT NOT NULL, -- Private key encrypted with user's master key
    
    -- Key metadata
    key_size INTEGER,
    algorithm VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Constraints
    UNIQUE(user_id, key_type, is_active),
    CONSTRAINT valid_key_type CHECK (key_type IN ('rsa', 'nacl', 'ecdsa'))
);

-- Indexes for encryption keys
CREATE INDEX IF NOT EXISTS idx_encryption_keys_user_id ON user_encryption_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_encryption_keys_active ON user_encryption_keys(is_active) WHERE is_active = TRUE;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM user_sessions WHERE expires_at < CURRENT_TIMESTAMP;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE users IS 'User accounts with zero-knowledge encryption support';
COMMENT ON COLUMN users.encrypted_first_name IS 'Client-side encrypted first name using AES-256';
COMMENT ON COLUMN users.encrypted_last_name IS 'Client-side encrypted last name using AES-256';
COMMENT ON COLUMN users.biometric_hash IS 'Secure hash of biometric data - never store raw biometric data';
COMMENT ON COLUMN users.encryption_salt IS 'Salt used for client-side key derivation';
COMMENT ON COLUMN users.encryption_iv IS 'Initialization vector for AES encryption';

COMMENT ON TABLE user_sessions IS 'Secure session management with device tracking';
COMMENT ON TABLE user_activity_log IS 'Security audit log for user activities';
COMMENT ON TABLE user_encryption_keys IS 'User RSA/NaCl key pairs for end-to-end encryption';
