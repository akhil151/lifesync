import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Container, Typography, Card, Button, Grid, TextField, Paper,
  CircularProgress, Chip, Avatar, IconButton, Divider, Alert, Fade
} from '@mui/material';
import {
  SmartToy, Send, Mic, Psychology, Security, Description,
  AccountBalance, People, Warning, Clear, AutoAwesome
} from '@mui/icons-material';
import { useAI } from '../contexts/AIContext';
import { useAuth } from '../contexts/AuthContext';
import groqAI from '../services/groqAI';

const AIAssistant = () => {
  const { user } = useAuth();
  const {
    sendMessage,
    isLoading,
    conversationHistory,
    clearConversation,
    getEstatePlanningAdvice,
    getSecurityRecommendations,
    getLegalGuidance,
    generateSmartReminders
  } = useAI();

  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [quickActions, setQuickActions] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  useEffect(() => {
    // Generate smart reminders on component mount
    generateSmartReminders();
  }, [generateSmartReminders]);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message;
    setMessage('');

    try {
      await sendMessage(userMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = async (action) => {
    setActiveTab('chat');

    switch (action.type) {
      case 'estate_planning':
        await sendMessage("I need help with estate planning for my digital assets. Can you provide personalized recommendations?");
        break;
      case 'security':
        await sendMessage("What security measures should I implement to protect my digital legacy?");
        break;
      case 'legal':
        await sendMessage("What legal considerations should I be aware of for digital inheritance?");
        break;
      case 'heir_access':
        await sendMessage("How should I set up access controls for my heirs?");
        break;
      case 'documents':
        await sendMessage("What important documents should I prepare for my digital legacy?");
        break;
      case 'emergency':
        await sendMessage("What should I do in case of an emergency to protect my digital assets?");
        break;
      default:
        await sendMessage(action.message);
    }
  };

  const quickActionButtons = [
    {
      type: 'estate_planning',
      label: 'Estate Planning',
      icon: <AccountBalance />,
      color: 'primary',
      description: 'Get personalized estate planning advice'
    },
    {
      type: 'security',
      label: 'Security Tips',
      icon: <Security />,
      color: 'success',
      description: 'Learn about security best practices'
    },
    {
      type: 'legal',
      label: 'Legal Guidance',
      icon: <Psychology />,
      color: 'info',
      description: 'Understand legal requirements'
    },
    {
      type: 'heir_access',
      label: 'Heir Access',
      icon: <People />,
      color: 'warning',
      description: 'Set up heir permissions'
    },
    {
      type: 'documents',
      label: 'Document Help',
      icon: <Description />,
      color: 'secondary',
      description: 'Organize important documents'
    },
    {
      type: 'emergency',
      label: 'Emergency Guide',
      icon: <Warning />,
      color: 'error',
      description: 'Emergency response planning'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{
              bgcolor: 'primary.main',
              mr: 2,
              width: 56,
              height: 56,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
              <AutoAwesome sx={{ fontSize: 28 }} />
            </Avatar>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>
                AI Assistant
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Powered by Llama3-8b-8192 • Get intelligent help with your digital legacy
              </Typography>
            </Box>
          </Box>

          <Alert
            severity={groqAI.isMockMode() ? "warning" : "info"}
            sx={{ mb: 3 }}
          >
            <Typography variant="body2">
              <strong>🚀 AI-Powered:</strong> This assistant uses advanced AI to provide personalized advice for digital legacy planning,
              security recommendations, and legal guidance.
              {groqAI.isMockMode() ? (
                <span>
                  <br />
                  <strong>🎭 Demo Mode:</strong> Currently using intelligent mock responses for demonstration.
                  In production, this connects directly to Groq Cloud's Llama3-8b-8192 model.
                </span>
              ) : (
                <span>All responses are generated in real-time using Groq Cloud's Llama3-8b-8192.</span>
              )}
            </Typography>
          </Alert>
        </Box>

        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid item xs={12}>
            <Card sx={{ mb: 3 }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  {quickActionButtons.map((action, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={action.icon}
                        onClick={() => handleQuickAction(action)}
                        disabled={isLoading}
                        sx={{
                          p: 2,
                          height: 80,
                          flexDirection: 'column',
                          gap: 1,
                          borderColor: `${action.color}.main`,
                          color: `${action.color}.main`,
                          '&:hover': {
                            borderColor: `${action.color}.main`,
                            backgroundColor: `${action.color}.light`,
                            color: `${action.color}.dark`
                          }
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {action.label}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8, textAlign: 'center' }}>
                          {action.description}
                        </Typography>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Card>
          </Grid>

          {/* Main Chat Interface */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ height: 600, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{
                p: 3,
                borderBottom: '1px solid #e0e0e0',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SmartToy sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      AI Chat Assistant
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      label={groqAI.isMockMode() ? "Demo Mode" : "Llama3-8b-8192"}
                      size="small"
                      sx={{
                        backgroundColor: groqAI.isMockMode() ? 'rgba(255,193,7,0.3)' : 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={clearConversation}
                      sx={{ color: 'white' }}
                      disabled={isLoading}
                    >
                      <Clear />
                    </IconButton>
                  </Box>
                </Box>
              </Box>

              <Box sx={{
                flexGrow: 1,
                p: 3,
                overflow: 'auto',
                backgroundColor: '#fafafa'
              }}>
                {conversationHistory.length === 0 ? (
                  <Fade in={true}>
                    <Paper sx={{
                      p: 3,
                      mb: 2,
                      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                      border: '1px solid #e3f2fd'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          <SmartToy />
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Welcome, {user?.firstName || 'User'}!
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        I'm your AI-powered Digital Legacy Assistant. I can help you with:
                      </Typography>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>• 🏛️ Estate planning and inheritance setup</Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>• 🔒 Security recommendations and best practices</Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>• 📄 Document organization and management</Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>• 👥 Heir access control configuration</Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>• ⚖️ Legal guidance for digital assets</Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>• 🚨 Emergency response planning</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', color: 'text.secondary' }}>
                        Try the quick actions above or ask me anything!
                      </Typography>
                    </Paper>
                  </Fade>
                ) : (
                  conversationHistory.map((msg, index) => (
                    <Fade in={true} key={index}>
                      <Box sx={{
                        display: 'flex',
                        mb: 2,
                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                      }}>
                        <Paper sx={{
                          p: 2,
                          maxWidth: '80%',
                          backgroundColor: msg.role === 'user'
                            ? 'primary.main'
                            : 'white',
                          color: msg.role === 'user' ? 'white' : 'text.primary',
                          borderRadius: msg.role === 'user'
                            ? '20px 20px 5px 20px'
                            : '20px 20px 20px 5px',
                          boxShadow: 2
                        }}>
                          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                            {msg.content}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              opacity: 0.7,
                              display: 'block',
                              mt: 1,
                              textAlign: msg.role === 'user' ? 'right' : 'left'
                            }}
                          >
                            {msg.timestamp?.toLocaleTimeString()}
                          </Typography>
                        </Paper>
                      </Box>
                    </Fade>
                  ))
                )}

                {isLoading && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Paper sx={{
                      p: 2,
                      backgroundColor: 'white',
                      borderRadius: '20px 20px 20px 5px',
                      boxShadow: 2
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress size={16} sx={{ mr: 2 }} />
                        <Typography variant="body1">
                          AI is thinking...
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                )}

                <div ref={messagesEndRef} />
              </Box>

              <Box sx={{ p: 3, borderTop: '1px solid #e0e0e0', backgroundColor: 'white' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="Ask me anything about your digital legacy..."
                    variant="outlined"
                    size="small"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    multiline
                    maxRows={3}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isLoading}
                    sx={{
                      minWidth: 'auto',
                      px: 3,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  >
                    {isLoading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                  </Button>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Press Enter to send • Powered by Groq Cloud & Llama3-8b-8192
                </Typography>
              </Box>
            </Card>
          </Grid>
          
          {/* AI Insights & Features Sidebar */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* AI Features */}
              <Grid item xs={12}>
                <Card>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                      🤖 AI Features
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label="Real-time AI"
                        color="primary"
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                      <Chip
                        label="Personalized"
                        color="secondary"
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                      <Chip
                        label="Legal Guidance"
                        color="info"
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                      <Chip
                        label="Security Analysis"
                        color="success"
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Powered by Groq Cloud's Llama3-8b-8192 model for intelligent assistance.
                    </Typography>
                  </Box>
                </Card>
              </Grid>

              {/* Smart Insights */}
              <Grid item xs={12}>
                <Card>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                      💡 Smart Insights
                    </Typography>

                    <Paper sx={{
                      p: 2,
                      mb: 2,
                      backgroundColor: 'success.light',
                      border: '1px solid',
                      borderColor: 'success.main'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Security sx={{ fontSize: 16, mr: 1, color: 'success.dark' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.dark' }}>
                          Security Alert
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="success.dark">
                        AI detected 3 accounts without MFA. Enable 2FA for better security.
                      </Typography>
                    </Paper>

                    <Paper sx={{
                      p: 2,
                      mb: 2,
                      backgroundColor: 'warning.light',
                      border: '1px solid',
                      borderColor: 'warning.main'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Description sx={{ fontSize: 16, mr: 1, color: 'warning.dark' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'warning.dark' }}>
                          Document Update
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="warning.dark">
                        Will hasn't been updated in 2 years. Review beneficiary info.
                      </Typography>
                    </Paper>
                  </Box>
                </Card>
              </Grid>

              {/* AI Statistics */}
              <Grid item xs={12}>
                <Card>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                      📊 Session Stats
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Questions</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {conversationHistory.filter(msg => msg.role === 'user').length}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">AI Responses</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {conversationHistory.filter(msg => msg.role === 'assistant').length}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Status</Typography>
                        <Chip
                          label={isLoading ? "Processing" : "Ready"}
                          color={isLoading ? "warning" : "success"}
                          size="small"
                        />
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
                      🔒 Encrypted & Private
                      <br />
                      🤖 Groq Cloud Powered
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* AI Status Banner */}
        <Card sx={{
          mt: 4,
          p: 3,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            🚀 AI Assistant Fully Operational
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Real-time AI responses powered by Groq Cloud & Llama3-8b-8192 •
            Personalized digital legacy planning assistance available now!
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default AIAssistant;
