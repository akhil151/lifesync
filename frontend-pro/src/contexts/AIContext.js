import React, { createContext, useContext, useState, useCallback } from 'react';
import groqAI from '../services/groqAI';
import { useAuth } from './AuthContext';

const AIContext = createContext();

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export const AIProvider = ({ children }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [smartReminders, setSmartReminders] = useState([]);

  // General AI Chat
  const sendMessage = useCallback(async (message) => {
    console.log('🚀 AIContext: Sending message:', message);
    setIsLoading(true);
    try {
      console.log('📞 AIContext: Calling groqAI.chatAssistant...');
      const response = await groqAI.chatAssistant(message, conversationHistory);
      console.log('✅ AIContext: Got response:', response);

      const newConversation = [
        ...conversationHistory,
        { role: 'user', content: message, timestamp: new Date() },
        { role: 'assistant', content: response, timestamp: new Date() }
      ];

      setConversationHistory(newConversation);
      console.log('💾 AIContext: Updated conversation history');
      return response;
    } catch (error) {
      console.error('❌ AIContext: AI Chat Error:', error);
      return 'I apologize, but I\'m having trouble responding right now. Please try again.';
    } finally {
      setIsLoading(false);
      console.log('🏁 AIContext: Finished processing message');
    }
  }, [conversationHistory]);

  // Document Analysis
  const analyzeDocument = useCallback(async (documentName, content, type) => {
    setIsLoading(true);
    try {
      const analysis = await groqAI.analyzeDocument(documentName, content, type);
      return {
        success: true,
        analysis,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Document Analysis Error:', error);
      return {
        success: false,
        error: 'Failed to analyze document',
        timestamp: new Date()
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Estate Planning Advice
  const getEstatePlanningAdvice = useCallback(async (userProfile) => {
    setIsLoading(true);
    try {
      const advice = await groqAI.getEstatePlanningAdvice(userProfile);
      return {
        success: true,
        advice,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Estate Planning Error:', error);
      return {
        success: false,
        error: 'Failed to get estate planning advice',
        timestamp: new Date()
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Security Recommendations
  const getSecurityRecommendations = useCallback(async (accountType, riskLevel) => {
    setIsLoading(true);
    try {
      const recommendations = await groqAI.getSecurityRecommendations(accountType, riskLevel);
      return {
        success: true,
        recommendations,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Security Recommendations Error:', error);
      return {
        success: false,
        error: 'Failed to get security recommendations',
        timestamp: new Date()
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Heir Access Advice
  const getHeirAccessAdvice = useCallback(async (heirProfile, assetTypes) => {
    setIsLoading(true);
    try {
      const advice = await groqAI.getHeirAccessAdvice(heirProfile, assetTypes);
      return {
        success: true,
        advice,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Heir Access Advice Error:', error);
      return {
        success: false,
        error: 'Failed to get heir access advice',
        timestamp: new Date()
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Smart Document Suggestions
  const getDocumentSuggestions = useCallback(async (userGoals, currentDocuments) => {
    setIsLoading(true);
    try {
      const suggestions = await groqAI.suggestDocuments(userGoals, currentDocuments);
      return {
        success: true,
        suggestions,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Document Suggestions Error:', error);
      return {
        success: false,
        error: 'Failed to get document suggestions',
        timestamp: new Date()
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Legal Guidance
  const getLegalGuidance = useCallback(async (question, jurisdiction) => {
    setIsLoading(true);
    try {
      const guidance = await groqAI.getLegalGuidance(question, jurisdiction);
      return {
        success: true,
        guidance,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Legal Guidance Error:', error);
      return {
        success: false,
        error: 'Failed to get legal guidance',
        timestamp: new Date()
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Generate Smart Reminders
  const generateSmartReminders = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const userActivity = 'Regular login, document uploads';
      const lastLogin = user.lastLogin || new Date().toISOString();
      const documentCount = 5; // This would come from actual data
      
      const reminders = await groqAI.generateSmartReminders(userActivity, lastLogin, documentCount);
      setSmartReminders(prev => [...prev, {
        content: reminders,
        timestamp: new Date(),
        read: false
      }]);
      
      return reminders;
    } catch (error) {
      console.error('Smart Reminders Error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Emergency Guidance
  const getEmergencyGuidance = useCallback(async (emergencyType, urgencyLevel) => {
    setIsLoading(true);
    try {
      const guidance = await groqAI.getEmergencyGuidance(emergencyType, urgencyLevel);
      return {
        success: true,
        guidance,
        timestamp: new Date(),
        emergency: true
      };
    } catch (error) {
      console.error('Emergency Guidance Error:', error);
      return {
        success: false,
        error: 'Failed to get emergency guidance',
        timestamp: new Date()
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear conversation
  const clearConversation = useCallback(() => {
    setConversationHistory([]);
  }, []);

  // Add AI insight
  const addAIInsight = useCallback((insight) => {
    setAiInsights(prev => [...prev, {
      ...insight,
      id: Date.now(),
      timestamp: new Date()
    }]);
  }, []);

  // Mark reminder as read
  const markReminderAsRead = useCallback((index) => {
    setSmartReminders(prev => prev.map((reminder, i) => 
      i === index ? { ...reminder, read: true } : reminder
    ));
  }, []);

  const value = {
    // State
    isLoading,
    conversationHistory,
    aiInsights,
    smartReminders,
    
    // Actions
    sendMessage,
    analyzeDocument,
    getEstatePlanningAdvice,
    getSecurityRecommendations,
    getHeirAccessAdvice,
    getDocumentSuggestions,
    getLegalGuidance,
    generateSmartReminders,
    getEmergencyGuidance,
    clearConversation,
    addAIInsight,
    markReminderAsRead
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
};
