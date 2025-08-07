import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  Stack,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccountBalance,
  CloudUpload,
  People,
  Security,
  TrendingUp,
  Notifications,
  Settings,
  Add,
  MoreVert,
  SmartToy,
  AutoAwesome,
  Psychology
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useAI } from '../contexts/AIContext';

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { generateSmartReminders, smartReminders, isLoading: aiLoading } = useAI();
  const [aiInsights, setAiInsights] = useState([]);

  useEffect(() => {
    // Generate AI insights when dashboard loads
    generateSmartReminders();
  }, [generateSmartReminders]);

  const stats = [
    {
      title: 'Digital Accounts',
      value: '12',
      change: '+2 this month',
      color: theme.palette.primary.main,
      icon: <AccountBalance />,
      path: '/accounts'
    },
    {
      title: 'Documents Stored',
      value: '8',
      change: '+3 this week',
      color: theme.palette.success.main,
      icon: <CloudUpload />,
      path: '/documents'
    },
    {
      title: 'Active Heirs',
      value: '3',
      change: 'All verified',
      color: theme.palette.warning.main,
      icon: <People />,
      path: '/heirs'
    },
    {
      title: 'Security Score',
      value: '98%',
      change: 'Excellent',
      color: theme.palette.error.main,
      icon: <Security />,
      path: '/settings'
    }
  ];

  const recentActivity = [
    {
      action: 'Document uploaded',
      item: 'Last Will & Testament',
      time: '2 hours ago',
      type: 'document'
    },
    {
      action: 'Heir verified',
      item: 'Sarah Johnson',
      time: '1 day ago',
      type: 'heir'
    },
    {
      action: 'Account added',
      item: 'Chase Bank Account',
      time: '3 days ago',
      type: 'account'
    },
    {
      action: 'Security check',
      item: 'Biometric authentication',
      time: '1 week ago',
      type: 'security'
    }
  ];

  const quickActions = [
    { title: 'Add Account', icon: <AccountBalance />, path: '/accounts', color: 'primary' },
    { title: 'Upload Document', icon: <CloudUpload />, path: '/documents', color: 'success' },
    { title: 'Manage Heirs', icon: <People />, path: '/heirs', color: 'warning' },
    { title: 'AI Assistant', icon: <SmartToy />, path: '/ai-assistant', color: 'secondary', featured: true }
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: 3 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                  Welcome back, John! 👋
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Your digital legacy is secure and up to date
                </Typography>
              </Box>
              <Box>
                <IconButton sx={{ mr: 1 }}>
                  <Notifications />
                </IconButton>
                <IconButton onClick={() => navigate('/settings')}>
                  <Settings />
                </IconButton>
              </Box>
            </Box>
            <Chip
              label="🔐 All systems secure"
              color="success"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </motion.div>

        {/* AI Insights Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card sx={{
            mb: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    mr: 2,
                    width: 48,
                    height: 48
                  }}>
                    <AutoAwesome />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                      AI-Powered Insights
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Personalized recommendations from Llama3-8b-8192
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/ai-assistant')}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Open AI Assistant
                </Button>
              </Box>

              {smartReminders.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
                    🤖 Latest AI Recommendations:
                  </Typography>
                  <Box sx={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 2,
                    p: 2,
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {smartReminders[smartReminders.length - 1]?.content ||
                       "Enable 2FA on critical accounts • Review beneficiary information • Update emergency contacts"}
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: theme.shadows[8]
                    }
                  }}
                  onClick={() => navigate(stat.path)}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          backgroundColor: alpha(stat.color, 0.1),
                          color: stat.color,
                          mr: 2
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.title}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: stat.color, fontWeight: 500 }}>
                      {stat.change}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                    Quick Actions
                  </Typography>
                  <Grid container spacing={2}>
                    {quickActions.map((action, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="large"
                          startIcon={action.icon}
                          onClick={() => navigate(action.path)}
                          sx={{
                            py: 2,
                            borderRadius: 2,
                            borderColor: `${action.color}.main`,
                            color: `${action.color}.main`,
                            '&:hover': {
                              backgroundColor: alpha(theme.palette[action.color].main, 0.05),
                              transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {action.title}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Recent Activity
                    </Typography>
                    <Button size="small" color="primary">
                      View All
                    </Button>
                  </Box>
                  <Stack spacing={2}>
                    {recentActivity.map((activity, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            mr: 2
                          }}
                        >
                          {activity.type === 'document' && <CloudUpload />}
                          {activity.type === 'heir' && <People />}
                          {activity.type === 'account' && <AccountBalance />}
                          {activity.type === 'security' && <Security />}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {activity.action}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {activity.item}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {activity.time}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Security Status */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                    Security Status
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Overall Security</Typography>
                      <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                        98%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={98}
                      color="success"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip label="✓" size="small" color="success" sx={{ mr: 2, minWidth: 32 }} />
                      <Typography variant="body2">Two-factor authentication</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip label="✓" size="small" color="success" sx={{ mr: 2, minWidth: 32 }} />
                      <Typography variant="body2">Biometric login enabled</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip label="✓" size="small" color="success" sx={{ mr: 2, minWidth: 32 }} />
                      <Typography variant="body2">All documents encrypted</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip label="!" size="small" color="warning" sx={{ mr: 2, minWidth: 32 }} />
                      <Typography variant="body2">Alive check due in 25 days</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Assistant Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Card
                sx={{
                  background: 'var(--primary-gradient)',
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[12]
                  },
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate('/ai-assistant')}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        mr: 2
                      }}
                    >
                      🤖
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      AI Assistant
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                    "Hi John! I noticed you haven't updated your will in 6 months. Would you like me to help you review it?"
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    Chat Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
