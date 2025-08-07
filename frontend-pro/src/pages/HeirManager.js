import React from 'react';
import { Box, Container, Typography, Card, Button, Grid } from '@mui/material';
import { People, Add, Fingerprint } from '@mui/icons-material';

const HeirManager = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: 3 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            Heir Manager 👥
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage heirs and configure inheritance access
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <People sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Heir Setup
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Add family members and trusted individuals as heirs with customized access levels.
              </Typography>
              <Button variant="contained" startIcon={<Add />} size="large">
                Add Heir
              </Button>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <Fingerprint sx={{ fontSize: 64, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Biometric Setup
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Configure biometric authentication for heirs to access their designated assets.
              </Typography>
              <Button variant="outlined" size="large" color="secondary">
                Setup Biometrics
              </Button>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <Box sx={{ fontSize: '4rem', mb: 2 }}>🔐</Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Access Control
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Define what each heir can access and under what conditions.
              </Typography>
              <Button variant="outlined" size="large">
                Manage Access
              </Button>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mt: 4, p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            🚀 Advanced Heir Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Multi-factor authentication, emergency contacts, and automated heir verification systems.
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default HeirManager;
