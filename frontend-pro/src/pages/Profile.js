import React from 'react';
import { Box, Container, Typography, Card, Button, Grid, Avatar } from '@mui/material';
import { Person, Edit, Security } from '@mui/icons-material';

const Profile = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            Profile Settings 👤
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage your account information and preferences
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, fontSize: '3rem' }}>
                👤
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                John Doe
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                john.doe@example.com
              </Typography>
              <Button variant="contained" startIcon={<Edit />} size="large">
                Edit Profile
              </Button>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Account Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">First Name</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>John</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Last Name</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>Doe</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Email</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>john.doe@example.com</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Phone</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>+1 (555) 123-4567</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Member Since</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>January 2024</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mt: 4, p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            🚀 Complete Profile Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Full implementation will include profile editing, password changes, notification preferences, and account deletion.
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;
