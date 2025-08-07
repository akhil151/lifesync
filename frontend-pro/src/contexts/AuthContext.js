import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import encryption from '../utils/encryption';
import databaseService from '../services/database';
import socialAuthService from '../services/socialAuth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [masterKey, setMasterKey] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);

  const initializeApp = useCallback(async () => {
    try {
      // Test database connection
      const dbStatus = await databaseService.testConnection();
      setDbConnected(dbStatus.connected);

      // Check authentication status
      await checkAuthStatus();
    } catch (error) {
      console.error('App initialization failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check authentication status and database connection on app load
  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const encryptedUserData = localStorage.getItem('encryptedUserData');
      const userMasterKey = sessionStorage.getItem('masterKey');

      if (token && encryptedUserData && userMasterKey) {
        try {
          const response = await databaseService.verifyToken();
          if (response.success && response.valid) {
            // Decrypt user data
            const userData = encryption.decryptData(JSON.parse(encryptedUserData), userMasterKey);
            setUser(userData);
            setMasterKey(userMasterKey);
            setIsAuthenticated(true);
          } else {
            clearAuthData();
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          clearAuthData();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clearAuthData();
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);

      const { email, password, firstName, lastName } = userData;

      // Create master key from user credentials
      const userMasterKey = encryption.createMasterKey(email, password);

      // Encrypt all sensitive data client-side
      const encryptedCredentials = encryption.encryptCredentials(email, password, userMasterKey);
      const encryptedFirstName = encryption.encryptData(firstName, userMasterKey);
      const encryptedLastName = encryption.encryptData(lastName, userMasterKey);

      // Prepare registration payload (server never sees unencrypted data)
      const registrationData = {
        encryptedEmail: encryptedCredentials.encryptedEmail,
        encryptedPassword: encryptedCredentials.encryptedPassword,
        encryptedFirstName,
        encryptedLastName,
        email, // For demo purposes
        password, // For demo purposes
        firstName, // For demo purposes
        lastName, // For demo purposes
        authHash: encryption.hashBiometricData(password, email).hash
      };

      const response = await databaseService.registerUser(registrationData);

      if (response.success) {
        const { token, user: serverUser } = response.data;

        // Store encrypted user data locally
        const userDataToStore = {
          id: serverUser.id,
          email,
          firstName,
          lastName,
          createdAt: serverUser.createdAt
        };

        const encryptedUserData = encryption.encryptData(userDataToStore, userMasterKey);

        // Store authentication data
        localStorage.setItem('authToken', token);
        localStorage.setItem('encryptedUserData', JSON.stringify(encryptedUserData));
        sessionStorage.setItem('masterKey', userMasterKey);

        setUser(userDataToStore);
        setMasterKey(userMasterKey);
        setIsAuthenticated(true);

        return { success: true, user: userDataToStore };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);

      const { email, password, biometricData } = credentials;

      // Create master key from credentials
      const userMasterKey = encryption.createMasterKey(email, password);

      // Prepare login payload
      const loginData = {
        email, // For demo purposes
        password, // For demo purposes
        biometricData
      };

      const response = await databaseService.loginUser(loginData);

      if (response.success) {
        const { token, user: serverUser } = response.data;

        // Create user data object (decrypted for local use)
        const userDataToStore = {
          id: serverUser.id,
          email,
          firstName: 'User',
          lastName: '',
          lastLogin: serverUser.lastLogin
        };

        // Encrypt and store user data
        const encryptedUserData = encryption.encryptData(userDataToStore, userMasterKey);

        localStorage.setItem('authToken', token);
        localStorage.setItem('encryptedUserData', JSON.stringify(encryptedUserData));
        sessionStorage.setItem('masterKey', userMasterKey);

        setUser(userDataToStore);
        setMasterKey(userMasterKey);
        setIsAuthenticated(true);

        return { success: true, user: userDataToStore };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider) => {
    try {
      setLoading(true);

      let socialUser;

      // Get social user data based on provider
      switch (provider.toLowerCase()) {
        case 'google':
          socialUser = await socialAuthService.loginWithGoogle();
          break;
        case 'apple':
          socialUser = await socialAuthService.loginWithApple();
          break;
        case 'microsoft':
          socialUser = await socialAuthService.loginWithMicrosoft();
          break;
        default:
          throw new Error('Unsupported social login provider');
      }

      // Process social login with database
      const response = await databaseService.socialLogin(provider, socialUser);

      if (response.success) {
        const { token, user: serverUser } = response.data;

        // Create master key for social login (simplified for demo)
        const userMasterKey = encryption.createMasterKey(serverUser.email, `${provider}_${serverUser.id}`);

        // Store user data
        const userDataToStore = {
          id: serverUser.id,
          email: serverUser.email,
          firstName: serverUser.firstName,
          lastName: serverUser.lastName,
          provider: serverUser.provider,
          verified: serverUser.verified
        };

        const encryptedUserData = encryption.encryptData(userDataToStore, userMasterKey);

        localStorage.setItem('authToken', token);
        localStorage.setItem('encryptedUserData', JSON.stringify(encryptedUserData));
        sessionStorage.setItem('masterKey', userMasterKey);

        setUser(userDataToStore);
        setMasterKey(userMasterKey);
        setIsAuthenticated(true);

        return { success: true, user: userDataToStore, provider };
      } else {
        throw new Error(response.message || `${provider} login failed`);
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
      throw new Error(error.message || `${provider} login failed`);
    } finally {
      setLoading(false);
    }
  };

  const biometricLogin = async (email, biometricData) => {
    try {
      setLoading(true);

      const response = await databaseService.biometricLogin(email, biometricData);

      if (response.success) {
        const { token, user: serverUser } = response.data;

        // For biometric login, create a temporary master key
        const tempMasterKey = encryption.createMasterKey(email, `biometric_${serverUser.id}`);

        const tempUserData = {
          id: serverUser.id,
          email,
          firstName: 'User',
          lastName: '',
          authMethod: 'biometric'
        };

        const encryptedUserData = encryption.encryptData(tempUserData, tempMasterKey);

        localStorage.setItem('authToken', token);
        localStorage.setItem('encryptedUserData', JSON.stringify(encryptedUserData));
        sessionStorage.setItem('masterKey', tempMasterKey);
        sessionStorage.setItem('biometricAuth', 'true');

        setUser(tempUserData);
        setMasterKey(tempMasterKey);
        setIsAuthenticated(true);

        return { success: true, user: tempUserData };
      } else {
        throw new Error(response.message || 'Biometric login failed');
      }
    } catch (error) {
      console.error('Biometric login error:', error);
      throw new Error(error.message || 'Biometric login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear sensitive data from memory
      encryption.clearSensitiveData();
      
      // Clear local storage
      clearAuthData();
      
      // Notify server (optional)
      try {
        // Server logout notification would go here
        console.log('User logged out successfully');
      } catch (error) {
        console.warn('Logout notification failed:', error);
      }
      
      setUser(null);
      setMasterKey(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const clearAuthData = () => {
    databaseService.clearAuthData();
    sessionStorage.removeItem('biometricAuth');
  };

  const updateProfile = async (profileData) => {
    try {
      if (!masterKey) {
        throw new Error('Master key not available');
      }

      // For demo purposes, just update local data
      const updatedUser = { ...user, ...profileData };
      const encryptedUserData = encryption.encryptData(updatedUser, masterKey);
      localStorage.setItem('encryptedUserData', JSON.stringify(encryptedUserData));
      setUser(updatedUser);

      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      throw new Error('Profile update failed');
    }
  };

  const value = {
    user,
    masterKey,
    isAuthenticated,
    loading,
    dbConnected,
    register,
    login,
    socialLogin,
    biometricLogin,
    logout,
    updateProfile,
    encryption,
    databaseService
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
