import React from 'react';
import { Box, Container, Typography, Card, Button, Grid, Alert } from '@mui/material';
import { Warning, Fingerprint, Security } from '@mui/icons-material';

const EmergencyPortal = () => {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', pt: 3 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Warning sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, color: 'error.main' }}>
            Emergency Portal
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Heir access to digital legacy assets
          </Typography>
        </Box>

        <Alert severity="warning" sx={{ mb: 4, borderRadius: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            This portal is for authorized heirs only. All access attempts are logged and monitored.
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ textAlign: 'center', p: 4, border: '2px solid #fecaca' }}>
              <Fingerprint sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Biometric Verification
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Use your registered biometric data to access designated assets.
              </Typography>
              <Button variant="contained" size="large" color="error">
                Start Verification
              </Button>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ textAlign: 'center', p: 4, border: '2px solid #fecaca' }}>
              <Security sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Multi-Factor Auth
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Complete additional security verification steps.
              </Typography>
              <Button variant="outlined" size="large" color="error">
                Verify Identity
              </Button>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mt: 4, p: 3, textAlign: 'center', background: 'rgba(254, 202, 202, 0.1)', border: '1px solid #fecaca' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'error.main' }}>
            🚨 Emergency Access Protocol
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This portal will be fully functional in the complete implementation with biometric scanning, 
            OTP verification, and secure document access for verified heirs.
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default EmergencyPortal;
