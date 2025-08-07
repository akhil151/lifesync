/**
 * Groq Cloud AI Service for Backend
 * Handles AI requests with Llama3-8b-8192 model
 */

const fetch = require('node-fetch');

class GroqService {
  constructor() {
    this.apiKey = process.env.GROQ_API_KEY || '';
    this.baseURL = 'https://api.groq.com/openai/v1';
    this.model = 'llama3-8b-8192';
    this.maxTokens = 1024;
    this.temperature = 0.7;
  }

  /**
   * Make API call to Groq Cloud
   */
  async makeAPICall(messages, systemPrompt = null) {
    try {
      const requestMessages = systemPrompt 
        ? [{ role: 'system', content: systemPrompt }, ...messages]
        : messages;

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: requestMessages,
          max_tokens: this.maxTokens,
          temperature: this.temperature,
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
    } catch (error) {
      console.error('Groq AI API Error:', error);
      return {
        success: false,
        error: error.message,
        content: 'I apologize, but I\'m experiencing technical difficulties. Please try again later.'
      };
    }
  }

  /**
   * Chat completion for general AI assistant
   */
  async chatCompletion(userMessage, conversationHistory = []) {
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
      { role: 'user', content: userMessage }
    ];

    return await this.makeAPICall(messages, systemPrompt);
  }

  /**
   * Document analysis and categorization
   */
  async analyzeDocument(documentName, documentContent = '', documentType = '') {
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

    return await this.makeAPICall([{ role: 'user', content: userMessage }], systemPrompt);
  }

  /**
   * Security recommendations
   */
  async getSecurityRecommendations(accountType, riskLevel = 'medium') {
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

    return await this.makeAPICall([{ role: 'user', content: userMessage }], systemPrompt);
  }

  /**
   * Estate planning advice
   */
  async getEstatePlanningAdvice(userProfile) {
    const systemPrompt = `You are an AI estate planning advisor specializing in digital assets. Provide personalized recommendations for digital legacy planning based on user profiles.`;

    const userMessage = `Please provide estate planning recommendations for this profile:
Age: ${userProfile.age || 'Not specified'}
Marital Status: ${userProfile.maritalStatus || 'Not specified'}
Children: ${userProfile.hasChildren ? 'Yes' : 'No'}
Digital Assets: ${userProfile.digitalAssets?.join(', ') || 'Various'}
Primary Concerns: ${userProfile.concerns || 'General planning'}

Focus on digital asset management, heir access setup, and security measures.`;

    return await this.makeAPICall([{ role: 'user', content: userMessage }], systemPrompt);
  }

  /**
   * Smart reminders generation
   */
  async generateSmartReminders(userActivity, lastLogin, documentCount) {
    const systemPrompt = `You are an AI assistant that generates helpful, personalized reminders for digital legacy management. Create actionable reminders based on user activity patterns.`;

    const userMessage = `Generate personalized reminders based on:
Recent Activity: ${userActivity}
Last Login: ${lastLogin}
Document Count: ${documentCount}

Provide 2-3 helpful, actionable reminders to improve their digital legacy planning.`;

    return await this.makeAPICall([{ role: 'user', content: userMessage }], systemPrompt);
  }

  /**
   * Legal guidance (general)
   */
  async getLegalGuidance(question, jurisdiction = 'General') {
    const systemPrompt = `You are an AI legal advisor specializing in digital estate planning and inheritance law. Provide general legal guidance while always recommending users consult with qualified attorneys for specific legal advice.

IMPORTANT: Always include disclaimers that this is general information only and not legal advice.`;

    const userMessage = `Legal question about digital legacy planning:
Question: ${question}
Jurisdiction: ${jurisdiction}

Please provide general guidance and recommend consulting with a qualified attorney.`;

    return await this.makeAPICall([{ role: 'user', content: userMessage }], systemPrompt);
  }

  /**
   * Emergency response guidance
   */
  async getEmergencyGuidance(emergencyType, urgencyLevel = 'high') {
    const systemPrompt = `You are an AI emergency response advisor for digital legacy situations. Provide immediate, actionable guidance for urgent digital legacy scenarios.`;

    const userMessage = `Emergency situation requiring immediate guidance:
Type: ${emergencyType}
Urgency: ${urgencyLevel}

Provide step-by-step emergency response guidance for protecting digital assets and ensuring heir access.`;

    return await this.makeAPICall([{ role: 'user', content: userMessage }], systemPrompt);
  }

  /**
   * Health check for the service
   */
  async healthCheck() {
    try {
      const result = await this.makeAPICall([
        { role: 'user', content: 'Hello, are you working?' }
      ], 'You are a helpful AI assistant. Respond briefly that you are working properly.');
      
      return {
        success: result.success,
        status: result.success ? 'healthy' : 'unhealthy',
        model: this.model,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}

module.exports = new GroqService();
