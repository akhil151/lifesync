import { Router } from 'express';
import { Request, Response } from 'express';
import { authenticateToken } from '@/middleware/auth';
import { logger } from '@/utils/logger';

const router = Router();

// Groq AI Service Configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';
const GROQ_MODEL = 'llama3-8b-8192';

/**
 * Make API call to Groq Cloud
 */
async function callGroqAPI(messages: any[], systemPrompt?: string) {
  try {
    const requestMessages = systemPrompt
      ? [{ role: 'system', content: systemPrompt }, ...messages]
      : messages;

    const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: requestMessages,
        max_tokens: 1024,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return {
      success: true,
      content: data.choices[0]?.message?.content || 'No response generated',
      usage: data.usage
    };
  } catch (error: any) {
    logger.error('Groq AI API Error:', error);
    return {
      success: false,
      error: error.message,
      content: 'I apologize, but I\'m experiencing technical difficulties. Please try again later.'
    };
  }
}

/**
 * POST /api/ai-assistant/chat
 * General AI chat completion
 */
router.post('/chat', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a string'
      });
    }

    const systemPrompt = `You are a helpful AI assistant for a Digital Legacy Platform. You help users manage their digital assets, plan their digital inheritance, and organize important documents securely.

Key areas you assist with:
- Digital asset management and organization
- Estate planning and inheritance setup
- Security and privacy recommendations
- Document management and categorization
- Heir access control and permissions
- Legal guidance for digital legacy planning
- Technology recommendations for secure storage

Always be helpful, professional, and security-conscious. Provide practical, actionable advice.`;

    const messages = [
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const result = await callGroqAPI(messages, systemPrompt);

    res.json({
      success: result.success,
      response: result.content,
      usage: result.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('AI Chat Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during AI chat'
    });
  }
});

/**
 * POST /api/ai-assistant/analyze-document
 * Document analysis and categorization
 */
router.post('/analyze-document', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { documentName, documentContent = '', documentType = '' } = req.body;

    if (!documentName) {
      return res.status(400).json({
        success: false,
        error: 'Document name is required'
      });
    }

    const systemPrompt = `You are an AI document analyzer for a Digital Legacy Platform. Analyze documents and provide:
1. Document category (Legal, Financial, Personal, Medical, etc.)
2. Importance level (Critical, Important, Standard)
3. Recommended access permissions for heirs
4. Security recommendations
5. Brief summary of contents

Provide structured analysis with clear recommendations.`;

    const userMessage = `Please analyze this document:
Name: ${documentName}
Type: ${documentType}
Content Preview: ${documentContent.substring(0, 500)}...

Provide a structured analysis with categorization and recommendations.`;

    const result = await callGroqAPI([{ role: 'user', content: userMessage }], systemPrompt);

    res.json({
      success: result.success,
      analysis: result.content,
      usage: result.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('Document Analysis Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during document analysis'
    });
  }
});

/**
 * POST /api/ai-assistant/security-recommendations
 * Get security recommendations
 */
router.post('/security-recommendations', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { accountType, riskLevel = 'medium' } = req.body;

    if (!accountType) {
      return res.status(400).json({
        success: false,
        error: 'Account type is required'
      });
    }

    const systemPrompt = `You are a cybersecurity expert specializing in digital legacy protection. Provide specific security recommendations for protecting digital assets and ensuring secure inheritance.`;

    const userMessage = `Provide security recommendations for:
Account Type: ${accountType}
Risk Level: ${riskLevel}
Context: Digital Legacy Platform

Include recommendations for:
- Password management
- Two-factor authentication
- Encryption methods
- Access control for heirs
- Regular security audits

Provide 3-5 specific, actionable recommendations.`;

    const result = await callGroqAPI([{ role: 'user', content: userMessage }], systemPrompt);

    res.json({
      success: result.success,
      recommendations: result.content,
      usage: result.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('Security Recommendations Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during security analysis'
    });
  }
});

export default router;
