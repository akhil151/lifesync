import React from 'react';
import { Box, Container, Typography, Card, Button, Grid } from '@mui/material';
import { TrendingUp, Add, Assessment } from '@mui/icons-material';

const LoanManager = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: 3 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            Loan Manager 💰
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Track loans, payments, and financial obligations
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <TrendingUp sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Loan Tracking
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Monitor personal loans, mortgages, and business loans with automated payment tracking.
              </Typography>
              <Button variant="contained" startIcon={<Add />} size="large">
                Add Loan
              </Button>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <Assessment sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Payment Analytics
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Visualize payment history, interest calculations, and remaining balances.
              </Typography>
              <Button variant="outlined" size="large" color="success">
                View Analytics
              </Button>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <Box sx={{ fontSize: '4rem', mb: 2 }}>⚖️</Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Inheritance Planning
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Plan how loan obligations will be handled in your digital legacy.
              </Typography>
              <Button variant="outlined" size="large">
                Configure
              </Button>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mt: 4, p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            🚀 Full Implementation Features
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Automated payment reminders, loan amortization schedules, and heir liability management.
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default LoanManager;
