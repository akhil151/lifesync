/**
 * AI Routes - Groq Cloud Integration
 * Handles all AI-related API endpoints
 */

const express = require('express');
const router = express.Router();
const groqService = require('../services/groqService');
const { authenticateToken } = require('../middleware/auth');

/**
 * POST /api/ai/chat
 * General AI chat completion
 */
router.post('/chat', authenticateToken, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a string'
      });
    }

    const result = await groqService.chatCompletion(message, conversationHistory);

    res.json({
      success: result.success,
      response: result.content,
      usage: result.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during AI chat'
    });
  }
});

/**
 * POST /api/ai/analyze-document
 * Document analysis and categorization
 */
router.post('/analyze-document', authenticateToken, async (req, res) => {
  try {
    const { documentName, documentContent = '', documentType = '' } = req.body;

    if (!documentName) {
      return res.status(400).json({
        success: false,
        error: 'Document name is required'
      });
    }

    const result = await groqService.analyzeDocument(documentName, documentContent, documentType);

    res.json({
      success: result.success,
      analysis: result.content,
      usage: result.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Document Analysis Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during document analysis'
    });
  }
});

/**
 * POST /api/ai/security-recommendations
 * Get security recommendations
 */
router.post('/security-recommendations', authenticateToken, async (req, res) => {
  try {
    const { accountType, riskLevel = 'medium' } = req.body;

    if (!accountType) {
      return res.status(400).json({
        success: false,
        error: 'Account type is required'
      });
    }

    const result = await groqService.getSecurityRecommendations(accountType, riskLevel);

    res.json({
      success: result.success,
      recommendations: result.content,
      usage: result.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Security Recommendations Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during security analysis'
    });
  }
});

/**
 * POST /api/ai/estate-planning
 * Get estate planning advice
 */
router.post('/estate-planning', authenticateToken, async (req, res) => {
  try {
    const { userProfile } = req.body;

    if (!userProfile || typeof userProfile !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'User profile is required'
      });
    }

    const result = await groqService.getEstatePlanningAdvice(userProfile);

    res.json({
      success: result.success,
      advice: result.content,
      usage: result.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Estate Planning Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during estate planning analysis'
    });
  }
});

/**
 * POST /api/ai/smart-reminders
 * Generate smart reminders
 */
router.post('/smart-reminders', authenticateToken, async (req, res) => {
  try {
    const { userActivity, lastLogin, documentCount } = req.body;

    const result = await groqService.generateSmartReminders(
      userActivity || 'Regular usage',
      lastLogin || new Date().toISOString(),
      documentCount || 0
    );

    res.json({
      success: result.success,
      reminders: result.content,
      usage: result.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Smart Reminders Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during reminder generation'
    });
  }
});

/**
 * POST /api/ai/legal-guidance
 * Get legal guidance
 */
router.post('/legal-guidance', authenticateToken, async (req, res) => {
  try {
    const { question, jurisdiction = 'General' } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        error: 'Legal question is required'
      });
    }

    const result = await groqService.getLegalGuidance(question, jurisdiction);

    res.json({
      success: result.success,
      guidance: result.content,
      usage: result.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Legal Guidance Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during legal guidance'
    });
  }
});

/**
 * POST /api/ai/emergency-guidance
 * Get emergency response guidance
 */
router.post('/emergency-guidance', authenticateToken, async (req, res) => {
  try {
    const { emergencyType, urgencyLevel = 'high' } = req.body;

    if (!emergencyType) {
      return res.status(400).json({
        success: false,
        error: 'Emergency type is required'
      });
    }

    const result = await groqService.getEmergencyGuidance(emergencyType, urgencyLevel);

    res.json({
      success: result.success,
      guidance: result.content,
      usage: result.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Emergency Guidance Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during emergency guidance'
    });
  }
});

/**
 * GET /api/ai/health
 * AI service health check
 */
router.get('/health', async (req, res) => {
  try {
    const healthStatus = await groqService.healthCheck();

    res.json({
      service: 'Groq AI Service',
      model: 'llama3-8b-8192',
      ...healthStatus
    });

  } catch (error) {
    console.error('AI Health Check Error:', error);
    res.status(500).json({
      success: false,
      status: 'unhealthy',
      error: 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/ai/status
 * Get AI service status and capabilities
 */
router.get('/status', (req, res) => {
  res.json({
    success: true,
    service: 'Digital Legacy AI Assistant',
    provider: 'Groq Cloud',
    model: 'llama3-8b-8192',
    capabilities: [
      'General AI Chat',
      'Document Analysis',
      'Security Recommendations',
      'Estate Planning Advice',
      'Smart Reminders',
      'Legal Guidance',
      'Emergency Response'
    ],
    endpoints: [
      'POST /api/ai/chat',
      'POST /api/ai/analyze-document',
      'POST /api/ai/security-recommendations',
      'POST /api/ai/estate-planning',
      'POST /api/ai/smart-reminders',
      'POST /api/ai/legal-guidance',
      'POST /api/ai/emergency-guidance',
      'GET /api/ai/health',
      'GET /api/ai/status'
    ],
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
