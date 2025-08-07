import React from 'react';
import { Box, Container, Typography, Card, Button, Grid, Switch, FormControlLabel } from '@mui/material';
import { Settings as SettingsIcon, Security, Notifications } from '@mui/icons-material';

const Settings = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            Settings ⚙️
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Configure your security and notification preferences
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Security sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Security Settings
                </Typography>
              </Box>
              
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Two-Factor Authentication"
                sx={{ mb: 2, display: 'block' }}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Biometric Login"
                sx={{ mb: 2, display: 'block' }}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Email Security Alerts"
                sx={{ mb: 3, display: 'block' }}
              />
              
              <Button variant="contained" size="large">
                Update Security
              </Button>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Notifications sx={{ fontSize: 32, color: 'warning.main', mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Notifications
                </Typography>
              </Box>
              
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Email Notifications"
                sx={{ mb: 2, display: 'block' }}
              />
              <FormControlLabel
                control={<Switch />}
                label="SMS Notifications"
                sx={{ mb: 2, display: 'block' }}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Alive Check Reminders"
                sx={{ mb: 3, display: 'block' }}
              />
              
              <Button variant="contained" size="large" color="warning">
                Save Preferences
              </Button>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mt: 4, p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            🚀 Advanced Settings Coming Soon
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Complete settings panel with privacy controls, data export, account deletion, and advanced security options.
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default Settings;
