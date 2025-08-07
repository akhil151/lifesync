-- Digital Legacy Platform - Accounts Table with Zero-Knowledge Encryption
-- This table stores digital account information with client-side encryption

-- Digital accounts table (bank accounts, social media, etc.)
CREATE TABLE IF NOT EXISTS digital_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Account identification (encrypted)
    encrypted_account_name TEXT NOT NULL,     -- e.g., "Chase Bank Checking"
    encrypted_account_type TEXT NOT NULL,     -- e.g., "bank", "social_media", "email"
    encrypted_institution_name TEXT,          -- e.g., "Chase Bank", "Facebook"
    
    -- Account credentials (all encrypted client-side)
    encrypted_username TEXT,                  -- Login username/email
    encrypted_password TEXT,                  -- Account password
    encrypted_account_number TEXT,            -- Account number if applicable
    encrypted_routing_number TEXT,            -- Routing number for banks
    encrypted_additional_info JSONB,          -- Other encrypted account details
    
    -- Security information (encrypted)
    encrypted_security_questions JSONB,      -- Security questions and answers
    encrypted_recovery_codes TEXT[],          -- Recovery/backup codes
    encrypted_two_factor_secret TEXT,         -- 2FA secret if applicable
    
    -- Encryption metadata
    encryption_salt VARCHAR(255) NOT NULL,   -- Unique salt for this account
    encryption_iv VARCHAR(255) NOT NULL,     -- Unique IV for this account
    key_derivation_iterations INTEGER DEFAULT 100000,
    
    -- Account status and metadata
    account_status VARCHAR(50) DEFAULT 'active', -- active, inactive, closed
    estimated_value DECIMAL(15,2),            -- Estimated account value (not encrypted for reporting)
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Access control
    requires_biometric BOOLEAN DEFAULT FALSE,
    requires_two_factor BOOLEAN DEFAULT TRUE,
    access_level VARCHAR(50) DEFAULT 'full',  -- full, view_only, emergency_only
    
    -- Inheritance settings
    inheritance_instructions TEXT,            -- Special instructions for heirs
    emergency_access_enabled BOOLEAN DEFAULT TRUE,
    
    -- Audit and tracking
    last_verified TIMESTAMP,                 -- When account was last verified as active
    verification_method VARCHAR(100),        -- How it was verified
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_account_status CHECK (account_status IN ('active', 'inactive', 'closed', 'suspended')),
    CONSTRAINT valid_access_level CHECK (access_level IN ('full', 'view_only', 'emergency_only')),
    CONSTRAINT positive_value CHECK (estimated_value >= 0)
);

-- Indexes for digital accounts
CREATE INDEX IF NOT EXISTS idx_digital_accounts_user_id ON digital_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_digital_accounts_status ON digital_accounts(account_status);
CREATE INDEX IF NOT EXISTS idx_digital_accounts_created ON digital_accounts(created_at);
CREATE INDEX IF NOT EXISTS idx_digital_accounts_deleted ON digital_accounts(deleted_at) WHERE deleted_at IS NULL;

-- Account heir permissions table
CREATE TABLE IF NOT EXISTS account_heir_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES digital_accounts(id) ON DELETE CASCADE,
    heir_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Permission settings
    access_level VARCHAR(50) NOT NULL DEFAULT 'view_only',
    can_modify BOOLEAN DEFAULT FALSE,
    can_close_account BOOLEAN DEFAULT FALSE,
    can_transfer_funds BOOLEAN DEFAULT FALSE,
    
    -- Access conditions
    requires_biometric BOOLEAN DEFAULT TRUE,
    requires_multiple_heirs BOOLEAN DEFAULT FALSE,
    minimum_heirs_required INTEGER DEFAULT 1,
    
    -- Time-based access
    access_delay_days INTEGER DEFAULT 0,     -- Days to wait before access is granted
    access_expires_at TIMESTAMP,             -- When access expires
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    granted_at TIMESTAMP,                    -- When access was actually granted
    
    -- Audit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    UNIQUE(account_id, heir_id),
    CONSTRAINT valid_heir_access_level CHECK (access_level IN ('view_only', 'full', 'transfer_only')),
    CONSTRAINT valid_minimum_heirs CHECK (minimum_heirs_required > 0)
);

-- Indexes for heir permissions
CREATE INDEX IF NOT EXISTS idx_heir_permissions_account ON account_heir_permissions(account_id);
CREATE INDEX IF NOT EXISTS idx_heir_permissions_heir ON account_heir_permissions(heir_id);
CREATE INDEX IF NOT EXISTS idx_heir_permissions_active ON account_heir_permissions(is_active) WHERE is_active = TRUE;

-- Account access log for security and audit
CREATE TABLE IF NOT EXISTS account_access_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES digital_accounts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Access details
    access_type VARCHAR(100) NOT NULL,       -- view, modify, delete, etc.
    access_method VARCHAR(100),              -- web, mobile, api, emergency
    
    -- Authentication used
    auth_method VARCHAR(100),                -- password, biometric, 2fa, etc.
    biometric_verified BOOLEAN DEFAULT FALSE,
    two_factor_verified BOOLEAN DEFAULT FALSE,
    
    -- Request metadata
    ip_address INET,
    user_agent TEXT,
    device_fingerprint VARCHAR(255),
    
    -- Security assessment
    is_suspicious BOOLEAN DEFAULT FALSE,
    risk_score INTEGER DEFAULT 0,
    
    -- Result
    access_granted BOOLEAN NOT NULL,
    failure_reason TEXT,
    
    -- Timestamp
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for access log
CREATE INDEX IF NOT EXISTS idx_access_log_account ON account_access_log(account_id);
CREATE INDEX IF NOT EXISTS idx_access_log_user ON account_access_log(user_id);
CREATE INDEX IF NOT EXISTS idx_access_log_created ON account_access_log(created_at);
CREATE INDEX IF NOT EXISTS idx_access_log_suspicious ON account_access_log(is_suspicious) WHERE is_suspicious = TRUE;

-- Account verification table for periodic checks
CREATE TABLE IF NOT EXISTS account_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES digital_accounts(id) ON DELETE CASCADE,
    
    -- Verification details
    verification_type VARCHAR(100) NOT NULL, -- manual, automated, api_check
    verification_status VARCHAR(50) NOT NULL, -- verified, failed, pending
    verification_method VARCHAR(100),        -- login_test, api_call, manual_check
    
    -- Results
    account_active BOOLEAN,
    balance_available BOOLEAN,
    last_activity_date DATE,
    verification_notes TEXT,
    
    -- Verification metadata
    verified_by UUID REFERENCES users(id),   -- User who performed verification
    verification_data JSONB,                 -- Additional verification data
    
    -- Timestamps
    scheduled_at TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_verification_status CHECK (verification_status IN ('verified', 'failed', 'pending', 'skipped'))
);

-- Indexes for verifications
CREATE INDEX IF NOT EXISTS idx_verifications_account ON account_verifications(account_id);
CREATE INDEX IF NOT EXISTS idx_verifications_status ON account_verifications(verification_status);
CREATE INDEX IF NOT EXISTS idx_verifications_scheduled ON account_verifications(scheduled_at);

-- Account categories for organization
CREATE TABLE IF NOT EXISTS account_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Category details
    name VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(7), -- Hex color code
    icon VARCHAR(100), -- Icon identifier
    
    -- Settings
    is_default BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    
    -- Audit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    UNIQUE(user_id, name)
);

-- Account category assignments
CREATE TABLE IF NOT EXISTS account_category_assignments (
    account_id UUID NOT NULL REFERENCES digital_accounts(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES account_categories(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (account_id, category_id)
);

-- Triggers for updated_at
CREATE TRIGGER update_digital_accounts_updated_at 
    BEFORE UPDATE ON digital_accounts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_account_heir_permissions_updated_at 
    BEFORE UPDATE ON account_heir_permissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_account_categories_updated_at 
    BEFORE UPDATE ON account_categories 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE digital_accounts IS 'Digital accounts with zero-knowledge client-side encryption';
COMMENT ON COLUMN digital_accounts.encrypted_account_name IS 'Client-side encrypted account name';
COMMENT ON COLUMN digital_accounts.encrypted_username IS 'Client-side encrypted login credentials';
COMMENT ON COLUMN digital_accounts.encrypted_password IS 'Client-side encrypted account password';
COMMENT ON COLUMN digital_accounts.encryption_salt IS 'Unique salt for this account encryption';

COMMENT ON TABLE account_heir_permissions IS 'Heir access permissions for specific accounts';
COMMENT ON TABLE account_access_log IS 'Security audit log for account access';
COMMENT ON TABLE account_verifications IS 'Periodic account verification records';
COMMENT ON TABLE account_categories IS 'User-defined categories for organizing accounts';
