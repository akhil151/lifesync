/**
 * Groq Cloud AI Service with Llama3-8b-8192
 * Provides AI assistance throughout the Digital Legacy Platform
 */

class GroqAIService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GROQ_API_KEY || '';
    this.baseURL = 'https://api.groq.com/openai/v1';
    this.model = 'llama3-8b-8192';
    this.maxTokens = 1024;
    this.temperature = 0.7;
    this.useMockMode = true; // Enable mock mode for demo
  }

  /**
   * Mock AI responses for demo purposes
   */
  getMockResponse(message, context = 'general') {
    const responses = {
      estate_planning: `Based on your digital legacy planning needs, here are my personalized recommendations:

🏛️ **Estate Planning Priorities:**
• Set up a digital executor to manage your online accounts
• Create a comprehensive digital asset inventory
• Establish clear heir access protocols with time-delayed activation
• Consider setting up a digital trust for cryptocurrency and NFTs

🔒 **Security Recommendations:**
• Enable 2FA on all critical accounts (banking, email, cloud storage)
• Use a password manager with emergency access features
• Store recovery codes in a secure, accessible location for heirs
• Regular security audits every 6 months

📄 **Essential Documents:**
• Digital will with specific online account instructions
• Power of attorney for digital assets
• Beneficiary designations for all financial accounts
• Emergency contact list with account recovery information

This advice is tailored to your profile and current digital footprint. Would you like me to elaborate on any of these recommendations?`,

      security: `Here are comprehensive security recommendations for your digital legacy:

🛡️ **Immediate Security Actions:**
• Enable two-factor authentication on all critical accounts
• Update passwords to unique, complex combinations
• Review and revoke unnecessary app permissions
• Set up account recovery options with trusted contacts

🔐 **Advanced Protection:**
• Use hardware security keys for high-value accounts
• Enable account monitoring and breach notifications
• Set up encrypted backup storage for important documents
• Create secure communication channels with heirs

⚠️ **Risk Assessment:**
Based on your account types, I've identified 3 high-risk accounts that need immediate attention:
1. Primary email account (single point of failure)
2. Banking accounts without MFA
3. Cloud storage with shared access

🚨 **Emergency Preparedness:**
• Create emergency access procedures for heirs
• Set up dead man's switch for critical information
• Establish secure communication protocols
• Regular security reviews and updates

These recommendations are based on current cybersecurity best practices. Implement them gradually, starting with the highest-risk items.`,

      legal: `Here's general legal guidance for digital legacy planning:

⚖️ **Legal Considerations:**
**DISCLAIMER: This is general information only and not legal advice. Please consult with a qualified attorney for specific legal guidance.**

📋 **Key Legal Documents:**
• Digital will or codicil addressing online assets
• Power of attorney with digital asset provisions
• Trust documents for cryptocurrency and digital investments
• Beneficiary designations for all accounts

🌍 **Jurisdictional Issues:**
• Different states have varying digital asset laws
• International accounts may have complex inheritance rules
• Some platforms have specific terms for deceased users
• Consider where your digital assets are legally "located"

🏛️ **Recent Legal Developments:**
• Revised Uniform Fiduciary Access to Digital Assets Act (RUFADAA)
• Platform-specific policies for account inheritance
• Cryptocurrency inheritance regulations
• Privacy laws affecting posthumous access

⚠️ **Important Notes:**
• Terms of service may override your will provisions
• Some accounts cannot be inherited (personal social media)
• Executor may need specific authorization for digital assets
• Regular legal review recommended as laws evolve

**Strongly recommend consulting with an estate planning attorney familiar with digital assets in your jurisdiction.**`,

      heir_access: `Here's guidance for setting up secure heir access to your digital assets:

👥 **Heir Access Strategy:**
• Implement tiered access levels based on relationship and trust
• Use time-delayed activation (30-90 days) for security
• Require multiple verification steps for high-value assets
• Create clear instructions for each type of account

🔑 **Access Methods:**
• Password manager with emergency access features
• Sealed envelope with critical information (stored securely)
• Digital dead man's switch services
• Trusted third-party escrow services

📊 **Recommended Access Levels:**
**Immediate Family (Spouse/Children):**
- Full access to financial accounts
- Limited access to personal communications
- Complete access to shared documents and photos

**Extended Family/Friends:**
- Access to specific shared memories or documents
- Limited financial account visibility
- Designated communication channels only

🛡️ **Security Measures:**
• Multi-factor authentication for heir access
• Legal documentation requirements
• Waiting periods for account changes
• Audit trails for all access attempts

⏰ **Implementation Timeline:**
1. Week 1: Set up password manager emergency access
2. Week 2: Create heir instruction documents
3. Week 3: Configure account-specific inheritance settings
4. Week 4: Test access procedures with trusted person

This ensures your digital legacy is accessible to the right people at the right time while maintaining security.`,

      documents: `Here are smart document organization recommendations:

📁 **Essential Document Categories:**

**Legal Documents (Critical Priority):**
• Will and testament (digital copy + physical)
• Power of attorney documents
• Trust agreements and beneficiary forms
• Marriage/divorce certificates
• Birth certificates for all family members

**Financial Documents (High Priority):**
• Bank account statements and access information
• Investment account details and beneficiaries
• Insurance policies (life, health, property)
• Tax returns (last 7 years)
• Debt information and payment schedules

**Digital Asset Documentation (High Priority):**
• Cryptocurrency wallet information and keys
• Domain name registrations and renewals
• Digital business assets and revenue streams
• Software licenses and subscriptions
• Cloud storage account details

**Personal Documents (Medium Priority):**
• Medical records and healthcare directives
• Educational certificates and transcripts
• Employment records and benefits information
• Property deeds and rental agreements

🔒 **Security Recommendations:**
• Encrypt all sensitive documents
• Use version control for important updates
• Store copies in multiple secure locations
• Regular backup verification (monthly)
• Access logs for document viewing

📋 **Organization System:**
• Consistent naming conventions
• Date-based version control
• Category-based folder structure
• Search tags for quick retrieval
• Regular review and cleanup schedule

This system ensures your important documents are organized, secure, and accessible when needed.`,

      emergency: `Here's immediate emergency response guidance for digital asset protection:

🚨 **Immediate Actions (First 24 Hours):**

**If Account Compromise Suspected:**
1. Change passwords on all critical accounts immediately
2. Enable 2FA on any accounts that don't have it
3. Check recent login activity and revoke suspicious sessions
4. Contact banks and financial institutions
5. Document all suspicious activity with screenshots

**If Identity Theft Detected:**
1. Place fraud alerts with credit bureaus
2. File police report and get report number
3. Contact affected financial institutions
4. Change passwords and security questions
5. Monitor accounts daily for unauthorized activity

**If Family Emergency (Incapacitation/Death):**
1. Locate emergency access documents immediately
2. Contact designated digital executor
3. Secure physical devices (phones, computers)
4. Notify critical service providers
5. Begin account inventory process

🔐 **Security Lockdown Procedures:**
• Activate emergency access protocols
• Secure all physical devices and storage media
• Change shared passwords and access codes
• Enable enhanced monitoring on all accounts
• Contact legal counsel if needed

📞 **Emergency Contacts:**
• Digital executor: [Contact immediately]
• Estate attorney: [Legal guidance]
• Financial advisor: [Asset protection]
• IT security professional: [Technical support]

⏰ **Timeline for Action:**
- **0-4 hours:** Immediate security measures
- **4-24 hours:** Contact professionals and family
- **1-7 days:** Begin formal procedures
- **1-4 weeks:** Complete asset inventory and transfer

**Remember: Acting quickly can prevent significant losses and complications. Don't hesitate to seek professional help.**`,

      general: `I'm here to help you with your digital legacy planning needs!

What specific aspect would you like to explore today? I can provide personalized guidance on:

🏛️ **Estate Planning** - Setting up digital inheritance
🔒 **Security** - Protecting your digital assets
📄 **Documents** - Organizing important files
👥 **Heir Access** - Managing beneficiary permissions
⚖️ **Legal Matters** - Understanding digital inheritance laws
🚨 **Emergency Planning** - Crisis response procedures

Feel free to ask me anything about digital legacy planning, and I'll provide specific, actionable advice tailored to your situation!`
    };

    // Determine response type based on message content
    const lowerMessage = message.toLowerCase();

    // Handle specific questions with contextual responses
    if (lowerMessage.includes('loan') || lowerMessage.includes('debt') || lowerMessage.includes('borrow')) {
      return `I understand you're asking about loan details in the context of digital legacy planning. Here's how loans and debts factor into your digital inheritance:

💰 **Digital Loan Management:**
• **Outstanding Debts:** All loans (personal, mortgage, credit cards) should be documented for your heirs
• **Digital Records:** Keep loan statements, payment schedules, and lender contact information in your digital vault
• **Automatic Payments:** Ensure heirs know about auto-pay setups to avoid missed payments during transition
• **Loan Insurance:** Document any loan protection or life insurance policies that cover debts

📋 **Essential Loan Documentation:**
• Current loan balances and payment schedules
• Lender contact information and account numbers
• Loan terms and conditions documents
• Payment history and statements
• Insurance policies covering loans

🔒 **Security for Loan Information:**
• Encrypt all financial documents containing loan details
• Store login credentials for online loan accounts securely
• Set up emergency access for spouse/executor to manage payments
• Regular updates when loan terms change

⚖️ **Legal Considerations:**
• Some loans may be forgiven upon death (federal student loans)
• Joint loans become sole responsibility of surviving borrower
• Estate may be responsible for paying off debts before inheritance
• Consult with estate attorney about debt liability

Would you like me to help you organize your loan documentation or set up secure access for your heirs?`;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hello! Welcome to your Digital Legacy Assistant. I'm here to help you with all aspects of digital inheritance planning.

I can assist you with:
🏛️ Estate planning and digital asset inheritance
🔒 Security recommendations for your accounts
📄 Document organization and management
👥 Setting up heir access to your digital assets
⚖️ Legal guidance for digital inheritance
🚨 Emergency planning and response

What specific aspect of digital legacy planning would you like to explore today? Feel free to ask me anything!`;
    } else if (lowerMessage.includes('estate') || lowerMessage.includes('planning') || lowerMessage.includes('inheritance')) {
      return responses.estate_planning;
    } else if (lowerMessage.includes('security') || lowerMessage.includes('protect') || lowerMessage.includes('safe')) {
      return responses.security;
    } else if (lowerMessage.includes('legal') || lowerMessage.includes('law') || lowerMessage.includes('attorney')) {
      return responses.legal;
    } else if (lowerMessage.includes('heir') || lowerMessage.includes('access') || lowerMessage.includes('family')) {
      return responses.heir_access;
    } else if (lowerMessage.includes('document') || lowerMessage.includes('organize') || lowerMessage.includes('file')) {
      return responses.documents;
    } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
      return responses.emergency;
    } else if (lowerMessage.includes('account') || lowerMessage.includes('bank') || lowerMessage.includes('financial')) {
      return `I can help you manage your financial accounts for digital legacy planning:

🏦 **Financial Account Management:**
• **Bank Accounts:** Document all checking, savings, and investment accounts
• **Digital Banking:** Secure login credentials and set up emergency access
• **Account Beneficiaries:** Ensure all accounts have designated beneficiaries
• **Automatic Transfers:** Document any recurring transfers or bill payments

🔐 **Security Best Practices:**
• Enable two-factor authentication on all financial accounts
• Use unique, strong passwords for each account
• Regular security reviews and password updates
• Monitor accounts for suspicious activity

📊 **Account Documentation:**
• Account numbers and routing information
• Contact details for financial institutions
• Investment portfolio details and advisors
• Insurance policies and beneficiary information

👥 **Heir Access Setup:**
• Joint account holders for immediate access
• Power of attorney for financial decisions
• Beneficiary designations on all accounts
• Emergency contact setup with banks

Would you like help with securing a specific type of financial account or setting up heir access?`;
    } else if (lowerMessage.includes('password') || lowerMessage.includes('login') || lowerMessage.includes('credential')) {
      return `Password and credential management is crucial for digital legacy planning:

🔑 **Password Management Strategy:**
• **Password Manager:** Use a reputable password manager (1Password, Bitwarden, LastPass)
• **Master Password:** Create a strong, memorable master password
• **Emergency Access:** Set up emergency access for trusted family members
• **Regular Updates:** Change passwords regularly, especially for critical accounts

🛡️ **Security Best Practices:**
• Use unique passwords for every account
• Enable two-factor authentication wherever possible
• Avoid storing passwords in browsers or unsecured documents
• Use hardware security keys for high-value accounts

👨‍👩‍👧‍👦 **Family Access Planning:**
• Share master password with trusted executor
• Document which accounts are most critical
• Set up emergency contacts with password manager
• Create printed backup of critical credentials (stored securely)

📋 **Credential Documentation:**
• List of all important accounts and services
• Recovery email addresses and phone numbers
• Security questions and answers (encrypted)
• Two-factor authentication backup codes

🚨 **Emergency Procedures:**
• Instructions for accessing password manager
• Contact information for account recovery
• Legal documentation for account access
• Timeline for credential changes after death

Would you like help setting up a password manager or creating an emergency access plan?`;
    } else if (lowerMessage.includes('crypto') || lowerMessage.includes('bitcoin') || lowerMessage.includes('blockchain')) {
      return `Cryptocurrency requires special consideration in digital legacy planning:

₿ **Cryptocurrency Inheritance:**
• **Private Keys:** The most critical element - without keys, crypto is lost forever
• **Hardware Wallets:** Physical devices storing your crypto securely
• **Exchange Accounts:** Centralized platforms like Coinbase, Binance
• **DeFi Protocols:** Decentralized finance positions and staking

🔐 **Security Considerations:**
• Never store private keys digitally without encryption
• Use hardware wallets for large amounts
• Consider multi-signature wallets for added security
• Keep seed phrases in multiple secure physical locations

📜 **Essential Documentation:**
• List of all wallets and exchange accounts
• Private keys and seed phrases (encrypted/secured)
• Instructions for accessing each wallet type
• Current portfolio breakdown and values

👥 **Heir Education:**
• Crypto basics and how wallets work
• Step-by-step access instructions
• Security warnings and best practices
• Contact information for crypto-savvy advisors

⚖️ **Legal Considerations:**
• Tax implications for inherited crypto
• Regulatory compliance in your jurisdiction
• Estate planning attorney familiar with crypto
• Proper valuation methods for estate purposes

🚨 **Emergency Planning:**
• Time-sensitive nature of some crypto assets
• Market volatility considerations
• Exchange account recovery procedures
• Hardware wallet recovery processes

Would you like help creating a secure crypto inheritance plan or documenting your digital assets?`;
    } else {
      // For any other message, provide a contextual response
      return `I understand you're asking about "${message}". Let me help you with that in the context of digital legacy planning:

Based on your question, here are some relevant considerations for your digital inheritance:

🎯 **Immediate Actions:**
• Document this aspect of your digital life in your legacy plan
• Consider how this affects your heirs and beneficiaries
• Evaluate security implications and access requirements
• Determine if special legal considerations apply

📋 **Documentation Needed:**
• Account information and access credentials
• Important contacts and support information
• Instructions for your heirs or executor
• Legal or financial implications to consider

🔒 **Security Measures:**
• Protect sensitive information with encryption
• Set up appropriate access controls
• Regular reviews and updates as needed
• Emergency access procedures for trusted individuals

👥 **Heir Considerations:**
• What your beneficiaries need to know
• How to transfer or manage this asset
• Timeline and procedures for access
• Professional help that might be needed

Would you like me to provide more specific guidance on any of these areas? I can help you create a detailed plan for managing this aspect of your digital legacy.

Feel free to ask follow-up questions or request help with specific digital legacy planning tasks!`;
    }
  }

  /**
   * Conversational AI responses - Natural like ChatGPT
   */
  getConversationalResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Greetings and general conversation
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon')) {
      return `Hey there! 👋 Welcome to LifeSync! I'm your AI assistant here to help you with anything related to digital legacy planning.

I can chat about the platform features, help you understand how to organize your digital assets, or just answer any questions you have about managing your digital inheritance. What's on your mind today?`;
    }

    // About the platform
    if (lowerMessage.includes('what is this') || lowerMessage.includes('what is lifesync') || lowerMessage.includes('tell me about') || lowerMessage.includes('explain this platform')) {
      return `LifeSync is a comprehensive digital legacy platform that helps you organize and secure your digital life for your loved ones. Think of it as your digital estate planning assistant!

Here's what you can do with LifeSync:
- Store and manage all your important accounts securely
- Organize documents with military-grade encryption
- Set up access for your heirs and beneficiaries
- Track loans and financial obligations
- Get AI-powered advice (that's me!) for planning
- Handle emergency situations with our emergency portal

It's like having a digital safety deposit box combined with a smart estate planning advisor. Pretty cool, right? What aspect interests you most?`;
    }

    // Loan/debt questions
    if (lowerMessage.includes('loan') || lowerMessage.includes('debt') || lowerMessage.includes('borrow') || lowerMessage.includes('mortgage')) {
      return `Ah, asking about loans and debts - that's actually a really important part of digital legacy planning that people often forget about!

With LifeSync, you can track all your loans and debts so your family knows exactly what's what if something happens to you. We help you document everything from mortgages to credit cards to personal loans.

The tricky thing about debts is that they don't just disappear when someone passes away - they become the estate's responsibility. So having everything organized and accessible to your heirs is super important.

Are you looking to add some loan information to your profile, or do you have questions about how debts work in estate planning?`;
    }

    // Security questions
    if (lowerMessage.includes('secure') || lowerMessage.includes('safe') || lowerMessage.includes('encrypt') || lowerMessage.includes('protect')) {
      return `Security is absolutely our top priority at LifeSync! We use zero-knowledge encryption, which means even we can't see your data - only you and the people you choose to share it with.

Think of it like this: your data is locked in a vault, and only you have the key. We don't have a master key or backdoor. Everything is encrypted before it even leaves your device.

We also support biometric authentication, two-factor authentication, and all the good security practices you'd expect from a platform handling such sensitive information.

What specific security concerns do you have? I'm happy to explain how we handle different types of data protection.`;
    }

    // Account/data questions
    if (lowerMessage.includes('account') || lowerMessage.includes('data') || lowerMessage.includes('information') || lowerMessage.includes('store')) {
      return `Great question about accounts and data! LifeSync is designed to be your central hub for all your digital life information.

You can store things like:
- Login credentials for important accounts (encrypted, of course)
- Financial account information
- Important documents and files
- Contact information for heirs and beneficiaries
- Instructions for accessing different services
- Even personal messages for your loved ones

Everything is organized in a way that makes sense, and you control exactly who can access what and when. It's like creating a digital roadmap for your family.

What kind of accounts or information are you thinking about adding to your profile?`;
    }

    // AI/chatbot questions
    if (lowerMessage.includes('ai') || lowerMessage.includes('chatbot') || lowerMessage.includes('assistant') || lowerMessage.includes('you')) {
      return `That's me! 🤖 I'm the AI assistant built into LifeSync to help make digital legacy planning less overwhelming and more conversational.

I'm powered by advanced AI technology (specifically Llama3-8b-8192 through Groq Cloud) and I'm designed to understand both the technical and emotional aspects of planning for your digital afterlife.

I can help you:
- Understand the platform features
- Make decisions about what to include in your digital legacy
- Answer questions about estate planning
- Provide security recommendations
- Just chat about whatever's on your mind related to digital inheritance

I try to be more like talking to a knowledgeable friend rather than reading a manual. What would you like to know more about?`;
    }

    // General questions or anything else
    return `That's an interesting question! I'm here to help you with anything related to LifeSync and digital legacy planning.

Whether you're curious about how the platform works, need advice on organizing your digital assets, want to understand security features, or just want to chat about estate planning in general, I'm all ears!

Could you tell me a bit more about what you're looking for? I'd love to give you a more specific and helpful response. What's the main thing you're trying to figure out or accomplish today?`;
  }

  /**
   * Make API call to Groq Cloud (with fallback to conversational responses)
   */
  async makeAPICall(messages, systemPrompt = null) {
    // If in mock mode or development, use mock responses
    if (this.useMockMode || process.env.NODE_ENV === 'development') {
      console.log('🎭 Using mock AI responses for demo');

      // Simulate API delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

      const userMessage = messages[messages.length - 1]?.content || '';
      return this.getConversationalResponse(userMessage);
    }

    try {
      console.log('🤖 Making Groq API call...', { messages, systemPrompt });

      const requestMessages = systemPrompt
        ? [{ role: 'system', content: systemPrompt }, ...messages]
        : messages;

      console.log('📤 Request messages:', requestMessages);

      const requestBody = {
        model: this.model,
        messages: requestMessages,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
        stream: false
      };

      console.log('📦 Request body:', requestBody);

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📥 Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ API Response:', data);

      const content = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
      console.log('💬 Generated content:', content);

      return content;
    } catch (error) {
      console.error('❌ Groq AI API Error, falling back to mock response:', error);

      // Fallback to mock response if API fails
      const userMessage = messages[messages.length - 1]?.content || '';
      const mockResponse = this.getMockResponse(userMessage);

      return `${mockResponse}

---
*Note: This response was generated using our demo AI system due to a connection issue with the live Groq Cloud API. In production, this would be a real-time response from Llama3-8b-8192.*`;
    }
  }

  /**
   * Toggle between mock and real API mode
   */
  setMockMode(enabled) {
    this.useMockMode = enabled;
    console.log(`🎭 Mock mode ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Check if currently using mock mode
   */
  isMockMode() {
    return this.useMockMode;
  }

  /**
   * General AI Assistant Chat
   */
  async chatAssistant(userMessage, conversationHistory = []) {
    const systemPrompt = `You are a friendly, conversational AI assistant for the LifeSync Digital Legacy Platform. Chat naturally like ChatGPT, but you have specialized knowledge about digital inheritance and the platform's features.

You can discuss:
- The LifeSync platform (account management, document storage, heir management, AI assistant, loan tracking, emergency portal)
- Digital legacy planning and inheritance
- Security and encryption features
- User data and accounts stored in the platform
- General conversation while staying helpful

Be conversational, friendly, and natural. Don't use excessive bullet points or formal formatting unless asked. Chat like a knowledgeable friend who understands both technology and estate planning. Answer questions about the platform's features and help users understand their digital legacy options.`;

    const messages = [
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    return await this.makeAPICall(messages, systemPrompt);
  }

  /**
   * Document Analysis and Categorization
   */
  async analyzeDocument(documentName, documentContent = '', documentType = '') {
    const systemPrompt = `You are an AI document analyzer for a Digital Legacy Platform. Analyze documents and provide:
1. Document category (Legal, Financial, Personal, Medical, etc.)
2. Importance level (Critical, Important, Standard)
3. Recommended access permissions for heirs
4. Security recommendations
5. Brief summary of contents`;

    const userMessage = `Please analyze this document:
Name: ${documentName}
Type: ${documentType}
Content Preview: ${documentContent.substring(0, 500)}...

Provide a structured analysis with categorization and recommendations.`;

    return await this.makeAPICall([{ role: 'user', content: userMessage }], systemPrompt);
  }

  /**
   * Estate Planning Recommendations
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
   * Security Recommendations
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
- Regular security audits`;

    return await this.makeAPICall([{ role: 'user', content: userMessage }], systemPrompt);
  }

  /**
   * Heir Access Recommendations
   */
  async getHeirAccessAdvice(heirProfile, assetTypes) {
    const systemPrompt = `You are an AI advisor for digital inheritance planning. Provide recommendations for setting up heir access to digital assets safely and legally.`;

    const userMessage = `Recommend heir access setup for:
Heir Relationship: ${heirProfile.relationship}
Heir Age: ${heirProfile.age}
Asset Types: ${assetTypes.join(', ')}
Trust Level: ${heirProfile.trustLevel || 'Standard'}

Provide specific recommendations for access levels, timing, and security measures.`;

    return await this.makeAPICall([{ role: 'user', content: userMessage }], systemPrompt);
  }

  /**
   * Smart Document Suggestions
   */
  async suggestDocuments(userGoals, currentDocuments = []) {
    const systemPrompt = `You are an AI document advisor for digital legacy planning. Suggest important documents users should prepare based on their goals and current document collection.`;

    const userMessage = `Based on these goals and current documents, suggest what documents are missing or need updates:

User Goals: ${userGoals}
Current Documents: ${currentDocuments.join(', ')}

Provide a prioritized list of recommended documents with brief explanations of their importance.`;

    return await this.makeAPICall([{ role: 'user', content: userMessage }], systemPrompt);
  }

  /**
   * Legal Guidance (General)
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
   * Smart Notifications and Reminders
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
   * Emergency Response Guidance
   */
  async getEmergencyGuidance(emergencyType, urgencyLevel = 'high') {
    const systemPrompt = `You are an AI emergency response advisor for digital legacy situations. Provide immediate, actionable guidance for urgent digital legacy scenarios.`;

    const userMessage = `Emergency situation requiring immediate guidance:
Type: ${emergencyType}
Urgency: ${urgencyLevel}

Provide step-by-step emergency response guidance for protecting digital assets and ensuring heir access.`;

    return await this.makeAPICall([{ role: 'user', content: userMessage }], systemPrompt);
  }
}

// Create singleton instance
const groqAI = new GroqAIService();

export default groqAI;
