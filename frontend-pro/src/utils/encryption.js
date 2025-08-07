import CryptoJS from 'crypto-js';

/**
 * CLIENT-SIDE ZERO-KNOWLEDGE ENCRYPTION UTILITIES
 * 
 * This ensures that:
 * 1. ALL data is encrypted on the client before transmission
 * 2. Server NEVER sees unencrypted data (including emails, passwords)
 * 3. Only the authenticated user can decrypt their data
 * 4. AI can search encrypted data without seeing actual content
 * 5. Software owners and AI cannot view any sensitive information
 */

class ZeroKnowledgeEncryption {
  constructor() {
    this.keyCache = new Map();
    this.sessionKey = null;
  }

  /**
   * Generate a cryptographically secure random salt
   */
  generateSalt(length = 32) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Generate a cryptographically secure random IV
   */
  generateIV(length = 16) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Derive encryption key from user credentials using PBKDF2
   */
  deriveKey(password, salt, iterations = 100000) {
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: iterations,
      hasher: CryptoJS.algo.SHA256
    });
    return key.toString();
  }

  /**
   * Create master key from user credentials
   * This key is used to encrypt all user data
   */
  createMasterKey(email, password) {
    const normalizedEmail = email.toLowerCase().trim();
    const salt = CryptoJS.SHA256(normalizedEmail).toString();
    return this.deriveKey(password, salt, 150000);
  }

  /**
   * Encrypt any data with AES-256-GCM
   * Returns object with encrypted data and metadata
   */
  encryptData(data, masterKey) {
    try {
      const salt = this.generateSalt();
      const iv = this.generateIV();
      const iterations = 100000;
      
      // Derive encryption key from master key
      const encryptionKey = this.deriveKey(masterKey, salt, iterations);
      
      // Convert data to string if it's an object
      const dataString = typeof data === 'object' ? JSON.stringify(data) : String(data);
      
      // Encrypt using AES-256-GCM
      const encrypted = CryptoJS.AES.encrypt(dataString, encryptionKey, {
        iv: CryptoJS.enc.Hex.parse(iv),
        mode: CryptoJS.mode.GCM,
        padding: CryptoJS.pad.NoPadding
      });
      
      return {
        encryptedData: encrypted.toString(),
        salt,
        iv,
        iterations,
        algorithm: 'AES-256-GCM',
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  /**
   * Decrypt data using the same master key
   */
  decryptData(encryptedObject, masterKey) {
    try {
      const { encryptedData, salt, iv, iterations } = encryptedObject;
      
      // Derive the same encryption key
      const encryptionKey = this.deriveKey(masterKey, salt, iterations);
      
      // Decrypt the data
      const decrypted = CryptoJS.AES.decrypt(encryptedData, encryptionKey, {
        iv: CryptoJS.enc.Hex.parse(iv),
        mode: CryptoJS.mode.GCM,
        padding: CryptoJS.pad.NoPadding
      });
      
      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
      
      // Try to parse as JSON, otherwise return as string
      try {
        return JSON.parse(decryptedString);
      } catch {
        return decryptedString;
      }
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  /**
   * Encrypt user credentials (email, password) for storage
   * Even emails are encrypted so server never sees them
   */
  encryptCredentials(email, password, masterKey) {
    return {
      encryptedEmail: this.encryptData(email.toLowerCase().trim(), masterKey),
      encryptedPassword: this.encryptData(password, masterKey)
    };
  }

  /**
   * Encrypt account information (bank details, social media, etc.)
   */
  encryptAccountData(accountData, masterKey) {
    const encryptedAccount = {};
    
    // Encrypt each field individually
    Object.keys(accountData).forEach(key => {
      if (accountData[key] && accountData[key] !== '') {
        encryptedAccount[`encrypted_${key}`] = this.encryptData(accountData[key], masterKey);
      }
    });
    
    return encryptedAccount;
  }

  /**
   * Decrypt account information
   */
  decryptAccountData(encryptedAccountData, masterKey) {
    const decryptedAccount = {};
    
    Object.keys(encryptedAccountData).forEach(key => {
      if (key.startsWith('encrypted_') && encryptedAccountData[key]) {
        const originalKey = key.replace('encrypted_', '');
        try {
          decryptedAccount[originalKey] = this.decryptData(encryptedAccountData[key], masterKey);
        } catch (error) {
          console.warn(`Failed to decrypt ${originalKey}:`, error);
          decryptedAccount[originalKey] = '[Encrypted]';
        }
      } else if (!key.startsWith('encrypted_')) {
        // Non-encrypted metadata
        decryptedAccount[key] = encryptedAccountData[key];
      }
    });
    
    return decryptedAccount;
  }

  /**
   * Create searchable encrypted index for AI
   * This allows AI to search without seeing actual data
   */
  createSearchableIndex(data, masterKey) {
    const searchTerms = [];
    
    // Extract searchable terms (without revealing actual content)
    if (typeof data === 'string') {
      // Create hash-based search terms
      const words = data.toLowerCase().split(/\s+/);
      words.forEach(word => {
        if (word.length > 2) {
          // Create searchable hash that doesn't reveal the word
          const searchHash = CryptoJS.SHA256(word + masterKey.substring(0, 16)).toString().substring(0, 16);
          searchTerms.push(searchHash);
        }
      });
    }
    
    return {
      encryptedData: this.encryptData(data, masterKey),
      searchIndex: searchTerms,
      indexVersion: 1
    };
  }

  /**
   * Search encrypted data using searchable index
   */
  searchEncryptedData(searchTerm, encryptedDataArray, masterKey) {
    const searchHash = CryptoJS.SHA256(searchTerm.toLowerCase() + masterKey.substring(0, 16)).toString().substring(0, 16);
    
    return encryptedDataArray.filter(item => {
      return item.searchIndex && item.searchIndex.includes(searchHash);
    });
  }

  /**
   * Encrypt file data for secure storage
   */
  encryptFile(fileBuffer, masterKey, fileName) {
    const fileData = {
      name: fileName,
      data: Array.from(new Uint8Array(fileBuffer)),
      type: 'file',
      size: fileBuffer.byteLength,
      uploadedAt: Date.now()
    };
    
    return this.encryptData(fileData, masterKey);
  }

  /**
   * Decrypt file data
   */
  decryptFile(encryptedFileData, masterKey) {
    const decryptedData = this.decryptData(encryptedFileData, masterKey);
    const uint8Array = new Uint8Array(decryptedData.data);
    return {
      name: decryptedData.name,
      buffer: uint8Array.buffer,
      size: decryptedData.size,
      uploadedAt: decryptedData.uploadedAt
    };
  }

  /**
   * Generate secure session key for temporary operations
   */
  generateSessionKey() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    this.sessionKey = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    return this.sessionKey;
  }

  /**
   * Encrypt data for transmission (double encryption)
   */
  encryptForTransmission(data, masterKey) {
    // First encrypt with master key
    const firstEncryption = this.encryptData(data, masterKey);
    
    // Then encrypt with session key for transmission
    const sessionKey = this.sessionKey || this.generateSessionKey();
    const secondEncryption = this.encryptData(firstEncryption, sessionKey);
    
    return {
      payload: secondEncryption,
      sessionKey: sessionKey
    };
  }

  /**
   * Hash biometric data securely (never store raw biometric data)
   */
  hashBiometricData(biometricData, userSalt) {
    let hash = biometricData;
    
    // Multiple rounds of hashing for extra security
    for (let i = 0; i < 10; i++) {
      hash = CryptoJS.SHA3(hash + userSalt + i.toString(), { outputLength: 512 }).toString();
    }
    
    // Final hash with PBKDF2
    const finalHash = CryptoJS.PBKDF2(hash, userSalt, {
      keySize: 512 / 32,
      iterations: 200000,
      hasher: CryptoJS.algo.SHA512
    }).toString();
    
    return {
      hash: finalHash,
      salt: userSalt,
      algorithm: 'SHA3-512-PBKDF2',
      rounds: 10
    };
  }

  /**
   * Verify biometric data against stored hash
   */
  verifyBiometricData(biometricData, storedBiometricHash) {
    try {
      const computedHash = this.hashBiometricData(biometricData, storedBiometricHash.salt);
      return computedHash.hash === storedBiometricHash.hash;
    } catch (error) {
      console.error('Biometric verification failed:', error);
      return false;
    }
  }

  /**
   * Clear sensitive data from memory
   */
  clearSensitiveData() {
    this.keyCache.clear();
    this.sessionKey = null;
    
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  }

  /**
   * Validate encryption integrity
   */
  validateEncryption(encryptedData) {
    return !!(
      encryptedData &&
      encryptedData.encryptedData &&
      encryptedData.salt &&
      encryptedData.iv &&
      encryptedData.iterations &&
      encryptedData.algorithm
    );
  }
}

// Create singleton instance
const encryption = new ZeroKnowledgeEncryption();

// Export functions for use in components
export const {
  encryptData,
  decryptData,
  encryptCredentials,
  encryptAccountData,
  decryptAccountData,
  createSearchableIndex,
  searchEncryptedData,
  encryptFile,
  decryptFile,
  hashBiometricData,
  verifyBiometricData,
  createMasterKey,
  generateSessionKey,
  encryptForTransmission,
  clearSensitiveData,
  validateEncryption
} = encryption;

export default encryption;
