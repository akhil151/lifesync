import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { CloudUpload, Add, Security } from '@mui/icons-material';

const DocumentManager = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: 3 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            Document Manager 📄
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Securely store and manage your important documents
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <CloudUpload sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Secure Upload
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Upload wills, deeds, insurance policies, and other important documents with end-to-end encryption.
              </Typography>
              <Button variant="contained" startIcon={<Add />} size="large" color="success">
                Upload Document
              </Button>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <Security sx={{ fontSize: 64, color: 'warning.main', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Access Control
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Set biometric requirements and multi-factor authentication for sensitive documents.
              </Typography>
              <Button variant="outlined" size="large" color="warning">
                Configure Access
              </Button>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <Box sx={{ fontSize: '4rem', mb: 2 }}>🔍</Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                AI Organization
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Our AI automatically categorizes and organizes your documents for easy management.
              </Typography>
              <Button variant="outlined" size="large">
                View Categories
              </Button>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mt: 4, p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            🚀 Advanced Features Coming Soon
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Document versioning, digital signatures, automated backups, and heir-specific document sharing.
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default DocumentManager;
