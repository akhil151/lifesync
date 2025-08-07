import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, Button, Grid, Alert, Chip, Avatar } from '@mui/material';
import { AccountBalance, Add, SmartToy, Security, AutoAwesome } from '@mui/icons-material';
import { useAI } from '../contexts/AIContext';

const AccountManager = () => {
  const { getSecurityRecommendations, isLoading } = useAI();
  const [aiRecommendations, setAiRecommendations] = useState(null);

  useEffect(() => {
    // Get AI security recommendations for account management
    const fetchRecommendations = async () => {
      try {
        const result = await getSecurityRecommendations('financial_accounts', 'high');
        if (result.success) {
          setAiRecommendations(result.recommendations);
        }
      } catch (error) {
        console.error('Failed to get AI recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [getSecurityRecommendations]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: 3 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            Account Manager 🏦
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage your digital accounts with AI-powered security insights
          </Typography>
        </Box>

        {/* AI Security Recommendations */}
        {aiRecommendations && (
          <Alert
            severity="info"
            icon={<AutoAwesome />}
            sx={{
              mb: 4,
              '& .MuiAlert-message': { width: '100%' }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  🤖 AI Security Recommendations
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {aiRecommendations}
                </Typography>
              </Box>
              <Chip
                label="Llama3-8b-8192"
                size="small"
                color="primary"
                sx={{ ml: 2, flexShrink: 0 }}
              />
            </Box>
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <AccountBalance sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Digital Accounts
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Securely store and manage your digital account information with heir-specific access controls.
              </Typography>
              <Button variant="contained" startIcon={<Add />} size="large">
                Add Account
              </Button>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <Box sx={{ fontSize: '4rem', mb: 2 }}>🔐</Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Zero-Knowledge Encryption
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Your account data is encrypted with military-grade security. Even we can't access your information.
              </Typography>
              <Button variant="outlined" size="large">
                Learn More
              </Button>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <Box sx={{ fontSize: '4rem', mb: 2 }}>👥</Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Heir Access Control
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Configure which heirs can access specific accounts and under what conditions.
              </Typography>
              <Button variant="outlined" size="large">
                Manage Access
              </Button>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mt: 4, p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            🚀 Coming Soon in Full Implementation
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Complete account management with bank integrations, cryptocurrency wallets, and automated inheritance workflows.
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default AccountManager;
