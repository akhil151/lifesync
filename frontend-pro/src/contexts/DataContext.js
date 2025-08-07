import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const { masterKey, encryption, isAuthenticated } = useAuth();
  
  // State for different data types
  const [accounts, setAccounts] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loans, setLoans] = useState([]);
  const [heirs, setHeirs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadAccounts(),
        loadDocuments(),
        loadLoans(),
        loadHeirs()
      ]);
    } catch (error) {
      console.error('Failed to load data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [encryption, masterKey]);

  // Load all data when authenticated
  useEffect(() => {
    if (isAuthenticated && masterKey) {
      loadAllData();
    }
  }, [isAuthenticated, masterKey, loadAllData]);

  // ACCOUNTS MANAGEMENT
  const loadAccounts = async () => {
    try {
      const response = await axios.get('/accounts');
      if (response.data.success) {
        // Decrypt accounts data
        const decryptedAccounts = response.data.data.map(account => {
          try {
            return encryption.decryptAccountData(account, masterKey);
          } catch (error) {
            console.warn('Failed to decrypt account:', account.id);
            return { ...account, decryptionError: true };
          }
        });
        setAccounts(decryptedAccounts);
      }
    } catch (error) {
      console.error('Failed to load accounts:', error);
    }
  };

  const addAccount = async (accountData) => {
    try {
      if (!masterKey) throw new Error('Master key not available');
      
      // Encrypt account data client-side
      const encryptedAccount = encryption.encryptAccountData(accountData, masterKey);
      
      // Create searchable index for AI
      const searchableData = encryption.createSearchableIndex(
        `${accountData.accountName} ${accountData.institutionName} ${accountData.accountType}`,
        masterKey
      );
      
      const response = await axios.post('/accounts', {
        ...encryptedAccount,
        searchIndex: searchableData.searchIndex,
        accountType: accountData.accountType, // Keep type unencrypted for categorization
        estimatedValue: accountData.estimatedValue // Keep value unencrypted for reporting
      });
      
      if (response.data.success) {
        const newAccount = encryption.decryptAccountData(response.data.data, masterKey);
        setAccounts(prev => [...prev, newAccount]);
        return { success: true, account: newAccount };
      }
    } catch (error) {
      console.error('Failed to add account:', error);
      throw new Error(error.response?.data?.message || 'Failed to add account');
    }
  };

  const updateAccount = async (accountId, accountData) => {
    try {
      if (!masterKey) throw new Error('Master key not available');
      
      const encryptedAccount = encryption.encryptAccountData(accountData, masterKey);
      
      const response = await axios.put(`/accounts/${accountId}`, encryptedAccount);
      
      if (response.data.success) {
        const updatedAccount = encryption.decryptAccountData(response.data.data, masterKey);
        setAccounts(prev => prev.map(acc => acc.id === accountId ? updatedAccount : acc));
        return { success: true, account: updatedAccount };
      }
    } catch (error) {
      console.error('Failed to update account:', error);
      throw new Error(error.response?.data?.message || 'Failed to update account');
    }
  };

  const deleteAccount = async (accountId) => {
    try {
      const response = await axios.delete(`/accounts/${accountId}`);
      
      if (response.data.success) {
        setAccounts(prev => prev.filter(acc => acc.id !== accountId));
        return { success: true };
      }
    } catch (error) {
      console.error('Failed to delete account:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete account');
    }
  };

  // DOCUMENTS MANAGEMENT
  const loadDocuments = async () => {
    try {
      const response = await axios.get('/documents');
      if (response.data.success) {
        const decryptedDocuments = response.data.data.map(doc => {
          try {
            return {
              ...doc,
              name: encryption.decryptData(doc.encryptedName, masterKey),
              description: doc.encryptedDescription ? 
                encryption.decryptData(doc.encryptedDescription, masterKey) : '',
            };
          } catch (error) {
            console.warn('Failed to decrypt document:', doc.id);
            return { ...doc, decryptionError: true };
          }
        });
        setDocuments(decryptedDocuments);
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  };

  const uploadDocument = async (file, documentData) => {
    try {
      if (!masterKey) throw new Error('Master key not available');
      
      // Read file as array buffer
      const fileBuffer = await file.arrayBuffer();
      
      // Encrypt file content
      const encryptedFile = encryption.encryptFile(fileBuffer, masterKey, file.name);
      
      // Encrypt metadata
      const encryptedMetadata = {
        encryptedName: encryption.encryptData(documentData.name || file.name, masterKey),
        encryptedDescription: documentData.description ? 
          encryption.encryptData(documentData.description, masterKey) : null,
        fileSize: file.size,
        fileType: file.type,
        uploadedAt: Date.now()
      };
      
      // Create form data
      const formData = new FormData();
      formData.append('encryptedFile', JSON.stringify(encryptedFile));
      formData.append('metadata', JSON.stringify(encryptedMetadata));
      
      const response = await axios.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        const newDocument = {
          ...response.data.data,
          name: documentData.name || file.name,
          description: documentData.description || '',
        };
        setDocuments(prev => [...prev, newDocument]);
        return { success: true, document: newDocument };
      }
    } catch (error) {
      console.error('Failed to upload document:', error);
      throw new Error(error.response?.data?.message || 'Failed to upload document');
    }
  };

  const downloadDocument = async (documentId) => {
    try {
      if (!masterKey) throw new Error('Master key not available');
      
      const response = await axios.get(`/documents/${documentId}/download`);
      
      if (response.data.success) {
        // Decrypt file data
        const decryptedFile = encryption.decryptFile(response.data.encryptedFile, masterKey);
        
        // Create blob and download
        const blob = new Blob([decryptedFile.buffer]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = decryptedFile.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        return { success: true };
      }
    } catch (error) {
      console.error('Failed to download document:', error);
      throw new Error(error.response?.data?.message || 'Failed to download document');
    }
  };

  // LOANS MANAGEMENT
  const loadLoans = async () => {
    try {
      const response = await axios.get('/loans');
      if (response.data.success) {
        const decryptedLoans = response.data.data.map(loan => {
          try {
            return encryption.decryptAccountData(loan, masterKey);
          } catch (error) {
            console.warn('Failed to decrypt loan:', loan.id);
            return { ...loan, decryptionError: true };
          }
        });
        setLoans(decryptedLoans);
      }
    } catch (error) {
      console.error('Failed to load loans:', error);
    }
  };

  const addLoan = async (loanData) => {
    try {
      if (!masterKey) throw new Error('Master key not available');
      
      const encryptedLoan = encryption.encryptAccountData(loanData, masterKey);
      
      const response = await axios.post('/loans', encryptedLoan);
      
      if (response.data.success) {
        const newLoan = encryption.decryptAccountData(response.data.data, masterKey);
        setLoans(prev => [...prev, newLoan]);
        return { success: true, loan: newLoan };
      }
    } catch (error) {
      console.error('Failed to add loan:', error);
      throw new Error(error.response?.data?.message || 'Failed to add loan');
    }
  };

  // HEIRS MANAGEMENT
  const loadHeirs = async () => {
    try {
      const response = await axios.get('/heirs');
      if (response.data.success) {
        const decryptedHeirs = response.data.data.map(heir => {
          try {
            return encryption.decryptAccountData(heir, masterKey);
          } catch (error) {
            console.warn('Failed to decrypt heir:', heir.id);
            return { ...heir, decryptionError: true };
          }
        });
        setHeirs(decryptedHeirs);
      }
    } catch (error) {
      console.error('Failed to load heirs:', error);
    }
  };

  const addHeir = async (heirData) => {
    try {
      if (!masterKey) throw new Error('Master key not available');
      
      const encryptedHeir = encryption.encryptAccountData(heirData, masterKey);
      
      const response = await axios.post('/heirs', encryptedHeir);
      
      if (response.data.success) {
        const newHeir = encryption.decryptAccountData(response.data.data, masterKey);
        setHeirs(prev => [...prev, newHeir]);
        return { success: true, heir: newHeir };
      }
    } catch (error) {
      console.error('Failed to add heir:', error);
      throw new Error(error.response?.data?.message || 'Failed to add heir');
    }
  };

  // AI SEARCH FUNCTIONALITY
  const searchData = async (searchTerm) => {
    try {
      if (!masterKey) throw new Error('Master key not available');
      
      // Search in local encrypted data
      const searchResults = {
        accounts: encryption.searchEncryptedData(searchTerm, accounts, masterKey),
        documents: documents.filter(doc => 
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        loans: encryption.searchEncryptedData(searchTerm, loans, masterKey),
        heirs: encryption.searchEncryptedData(searchTerm, heirs, masterKey)
      };
      
      return searchResults;
    } catch (error) {
      console.error('Search failed:', error);
      throw new Error('Search failed');
    }
  };

  const value = {
    // Data
    accounts,
    documents,
    loans,
    heirs,
    loading,
    error,
    
    // Account methods
    loadAccounts,
    addAccount,
    updateAccount,
    deleteAccount,
    
    // Document methods
    loadDocuments,
    uploadDocument,
    downloadDocument,
    
    // Loan methods
    loadLoans,
    addLoan,
    
    // Heir methods
    loadHeirs,
    addHeir,
    
    // Search
    searchData,
    
    // Utility
    loadAllData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
