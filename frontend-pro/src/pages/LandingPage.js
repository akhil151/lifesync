import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Chip,
  Stack,
  IconButton,
  useTheme,
  alpha,
  Fade,
  Slide,
  Zoom,
  Grow,
  Paper,
  Divider,
  Avatar,
  Badge
} from '@mui/material';
import {
  Security,
  CloudUpload,
  People,
  SmartToy,
  Fingerprint,
  AccountBalance,
  Shield,
  AutoAwesome,
  Verified,
  PlayArrow,
  GitHub,
  LinkedIn,
  Twitter,
  Visibility,
  Speed,
  Lock,
  Psychology,
  TrendingUp,
  Assessment,
  BusinessCenter,
  Diamond,
  Star,
  CheckCircle,
  ArrowForward,
  Menu,
  Close
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 4000);

    // Handle scroll for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: <Security fontSize="large" />,
      title: 'Ultra-Secure Inheritance',
      description: 'Military-grade encryption with biometric authentication ensures your digital legacy is protected with zero-knowledge architecture.',
      color: theme.palette.primary.main,
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
      stats: '256-bit AES',
      delay: 0
    },
    {
      icon: <CloudUpload fontSize="large" />,
      title: 'Document Management',
      description: 'Store and organize important documents with heir-specific access controls and end-to-end encryption.',
      color: theme.palette.success.main,
      gradient: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',
      stats: '10TB Storage',
      delay: 0.1
    },
    {
      icon: <AccountBalance fontSize="large" />,
      title: 'Account & Loan Tracking',
      description: 'Manage digital accounts and track loans with automated inheritance workflows and real-time monitoring.',
      color: theme.palette.warning.main,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      stats: 'Real-time Sync',
      delay: 0.2
    },
    {
      icon: <People fontSize="large" />,
      title: 'Heir Management',
      description: 'Set up heirs with biometric access and customized inheritance permissions for secure legacy transfer.',
      color: theme.palette.error.main,
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
      stats: 'Multi-factor Auth',
      delay: 0.3
    },
    {
      icon: <SmartToy fontSize="large" />,
      title: 'AI Assistant',
      description: 'Context-aware AI guide helps you navigate the platform and make informed decisions about your digital legacy.',
      color: theme.palette.secondary.main,
      gradient: 'linear-gradient(135deg, #d946ef 0%, #e879f9 100%)',
      stats: 'GPT-4 Powered',
      delay: 0.4
    },
    {
      icon: <Fingerprint fontSize="large" />,
      title: 'Biometric Security',
      description: 'Advanced biometric authentication ensures only authorized access to sensitive information with device-native security.',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
      stats: '99.9% Accuracy',
      delay: 0.5
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Secure Accounts', icon: '🔐', color: theme.palette.primary.main },
    { number: '99.9%', label: 'Uptime', icon: '⚡', color: theme.palette.success.main },
    { number: '256-bit', label: 'Encryption', icon: '🛡️', color: theme.palette.warning.main },
    { number: '24/7', label: 'AI Support', icon: '🤖', color: theme.palette.secondary.main }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Estate Planning Attorney',
      content: 'This platform revolutionizes how we handle digital inheritance. The security features are unmatched.',
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'Tech Executive',
      content: 'Finally, a solution that combines cutting-edge AI with military-grade security for digital legacy management.',
      avatar: '👨‍💻'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Cybersecurity Expert',
      content: 'The zero-knowledge encryption and biometric authentication make this the gold standard for digital inheritance.',
      avatar: '👩‍🔬'
    }
  ];

  return (
    <Box>
      {/* Professional Header */}
      <AppBar
        position="fixed"
        sx={{
          background: scrolled
            ? 'rgba(255, 255, 255, 0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.1)'
            : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(0, 0, 0, 0.1)'
            : '1px solid rgba(255,255,255,0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1100
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: 'var(--primary-gradient)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      boxShadow: '0 8px 24px rgba(14, 165, 233, 0.3)'
                    }}
                  >
                    <Shield sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontWeight: 800,
                        background: scrolled
                          ? 'var(--primary-gradient)'
                          : 'white',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      Digital Legacy
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: scrolled ? 'text.secondary' : 'rgba(255,255,255,0.8)',
                        fontWeight: 500,
                        letterSpacing: '0.5px'
                      }}
                    >
                      ENTERPRISE SECURITY
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              <Button
                color="inherit"
                sx={{
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  color: scrolled ? 'text.primary' : 'white',
                  '&:hover': {
                    backgroundColor: scrolled
                      ? 'rgba(14, 165, 233, 0.1)'
                      : 'rgba(255,255,255,0.1)'
                  }
                }}
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: 'var(--primary-gradient)',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(14, 165, 233, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(14, 165, 233, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate('/register')}
                endIcon={<ArrowForward />}
              >
                Get Started Free
              </Button>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: scrolled ? 'text.primary' : 'white'
              }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <Close /> : <Menu />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Paper
              sx={{
                position: 'fixed',
                top: 80,
                left: 16,
                right: 16,
                zIndex: 1200,
                borderRadius: 3,
                p: 2,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
            >
              <Stack spacing={1}>
                <Button
                  fullWidth
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  Sign In
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuOpen(false);
                  }}
                  sx={{
                    background: 'var(--primary-gradient)',
                    py: 1.5
                  }}
                >
                  Get Started Free
                </Button>
              </Stack>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{
          background: 'var(--primary-gradient)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Animated Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            animation: 'float 6s ease-in-out infinite'
          }}
        />

        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.3)',
              zIndex: 1,
              animation: `float ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
        
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, pt: 12 }}>
          <Grid container spacing={6} alignItems="center" sx={{ minHeight: '90vh' }}>
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Stack spacing={4}>
                  <Box>
                    <Chip
                      icon={<Diamond sx={{ fontSize: '18px !important' }} />}
                      label="ENTERPRISE-GRADE SECURITY"
                      sx={{
                        mb: 3,
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        px: 3,
                        py: 1,
                        border: '1px solid rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.25)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontWeight: 900,
                      fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                      lineHeight: 0.9,
                      textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                      mb: 3
                    }}
                  >
                    Secure Your
                    <Box component="span" sx={{ display: 'block', mt: 1 }}>
                      <Box
                        component="span"
                        sx={{
                          background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        Digital Legacy
                      </Box>
                    </Box>
                  </Typography>

                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      opacity: 0.95,
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                      lineHeight: 1.6,
                      textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                      maxWidth: '600px'
                    }}
                  >
                    The world's most secure digital inheritance platform with
                    <Box component="span" sx={{ fontWeight: 700, color: '#FFD700' }}> zero-knowledge encryption</Box>,
                    AI assistance, and biometric authentication.
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, my: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: '#4ade80', fontSize: 24 }} />
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Bank-Level Security
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: '#4ade80', fontSize: 24 }} />
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        AI-Powered
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: '#4ade80', fontSize: 24 }} />
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Zero-Knowledge
                      </Typography>
                    </Box>
                  </Box>

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={3}
                    sx={{ mt: 6 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<AutoAwesome />}
                      onClick={() => navigate('/register')}
                      sx={{
                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                        color: '#000',
                        px: 6,
                        py: 2.5,
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        borderRadius: 3,
                        boxShadow: '0 12px 40px rgba(255, 215, 0, 0.4)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 20px 60px rgba(255, 215, 0, 0.6)',
                          background: 'linear-gradient(45deg, #FFA500, #FFD700)',
                        },
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      Start Free Trial
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<PlayArrow />}
                      onClick={() => navigate('/emergency')}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        px: 6,
                        py: 2.5,
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        borderRadius: 3,
                        borderWidth: 2,
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255,255,255,0.1)',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          transform: 'translateY(-4px)',
                          borderWidth: 2,
                          boxShadow: '0 12px 40px rgba(255,255,255,0.2)'
                        },
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      Watch Demo
                    </Button>
                  </Stack>

                  <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', gap: 2, opacity: 0.9 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Trusted by 10,000+ users worldwide
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} sx={{ color: '#FFD700', fontSize: 20 }} />
                      ))}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      4.9/5
                    </Typography>
                  </Box>
                </Stack>
              </motion.div>
            </Grid>

            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <Box sx={{ position: 'relative', textAlign: 'center' }}>
                  {/* Professional Dashboard Preview */}
                  <Paper
                    elevation={24}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                      boxShadow: '0 40px 80px rgba(0,0,0,0.3)'
                    }}
                  >
                    <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 700 }}>
                      🛡️ Enterprise Security Dashboard
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{
                          p: 2,
                          borderRadius: 2,
                          background: 'rgba(34, 197, 94, 0.2)',
                          border: '1px solid rgba(34, 197, 94, 0.3)'
                        }}>
                          <Typography variant="h4" sx={{ color: '#4ade80', fontWeight: 800 }}>
                            256-bit
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                            AES Encryption
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{
                          p: 2,
                          borderRadius: 2,
                          background: 'rgba(14, 165, 233, 0.2)',
                          border: '1px solid rgba(14, 165, 233, 0.3)'
                        }}>
                          <Typography variant="h4" sx={{ color: '#38bdf8', fontWeight: 800 }}>
                            99.9%
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                            Uptime SLA
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Floating Security Badges */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: 'absolute',
                      top: -20,
                      right: -20
                    }}
                  >
                    <Chip
                      icon={<Security />}
                      label="SOC 2 Compliant"
                      sx={{
                        background: 'rgba(239, 68, 68, 0.9)',
                        color: 'white',
                        fontWeight: 600,
                        boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)'
                      }}
                    />
                  </motion.div>

                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: 'absolute',
                      bottom: -20,
                      left: -20
                    }}
                  >
                    <Chip
                      icon={<Verified />}
                      label="ISO 27001"
                      sx={{
                        background: 'rgba(34, 197, 94, 0.9)',
                        color: 'white',
                        fontWeight: 600,
                        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.4)'
                      }}
                    />
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                fontWeight: 900, 
                mb: 3,
                fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                lineHeight: 1.1,
                textShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
            >
              Secure Your Digital Legacy
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Typography 
              variant="h5" 
              component="p" 
              sx={{ 
                mb: 6, 
                opacity: 0.95,
                fontSize: { xs: '1.2rem', md: '1.4rem' },
                maxWidth: '900px',
                mx: 'auto',
                lineHeight: 1.6,
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}
            >
              Ultra-secure inheritance management with AI assistance. Protect your digital accounts, 
              documents, and loans with military-grade encryption and biometric authentication.
            </Typography>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Grid container spacing={4} sx={{ mb: 8, justifyContent: 'center' }}>
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.8 + index * 0.1,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -10
                    }}
                  >
                    <Box
                      sx={{
                        textAlign: 'center',
                        p: 3,
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: `0 20px 40px ${alpha(stat.color, 0.3)}`
                        }
                      }}
                    >
                      <Box
                        sx={{
                          animation: 'bounce 2s infinite',
                          animationDelay: `${index * 0.2}s`
                        }}
                      >
                        <Typography variant="h6" sx={{ fontSize: '2.5rem', mb: 1 }}>
                          {stat.icon}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          mb: 0.5,
                          background: `linear-gradient(45deg, ${stat.color}, white)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<AutoAwesome />}
                onClick={() => navigate('/register')}
                sx={{
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  px: 4,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Start Your Legacy
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<PlayArrow />}
                onClick={() => navigate('/emergency')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-3px)',
                    borderWidth: 2,
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Watch Demo
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontWeight: 800, 
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'var(--primary-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Comprehensive Digital Legacy Management
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                maxWidth: '700px', 
                mx: 'auto',
                fontSize: '1.2rem',
                lineHeight: 1.6
              }}
            >
              Everything you need to secure and manage your digital inheritance with cutting-edge technology and AI-powered assistance
            </Typography>
          </Box>
        </motion.div>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <motion.div
                initial={{
                  y: 100,
                  opacity: 0,
                  rotateX: -15,
                  scale: 0.9
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  rotateX: 0,
                  scale: 1
                }}
                transition={{
                  delay: feature.delay,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  y: -15,
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: `0 25px 50px ${alpha(feature.color, 0.3)}`
                }}
                onHoverStart={() => setActiveFeature(index)}
              >
                <Card
                  className="feature-card"
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    border: '2px solid',
                    borderColor: activeFeature === index ? feature.color : 'grey.100',
                    position: 'relative',
                    overflow: 'hidden',
                    background: activeFeature === index
                      ? `linear-gradient(135deg, ${alpha(feature.color, 0.05)} 0%, ${alpha(feature.color, 0.1)} 100%)`
                      : 'white',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: feature.gradient,
                      opacity: activeFeature === index ? 1 : 0,
                      transition: 'opacity 0.4s ease'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      background: feature.gradient,
                      borderRadius: 'inherit',
                      zIndex: -1,
                      opacity: activeFeature === index ? 0.2 : 0,
                      transition: 'opacity 0.4s ease',
                      filter: 'blur(8px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <motion.div
                      animate={activeFeature === index ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Box
                        sx={{
                          color: 'white',
                          mb: 3,
                          display: 'flex',
                          justifyContent: 'center',
                          p: 2,
                          borderRadius: '50%',
                          background: activeFeature === index
                            ? feature.gradient
                            : alpha(feature.color, 0.1),
                          width: 80,
                          height: 80,
                          alignItems: 'center',
                          mx: 'auto',
                          transition: 'all 0.4s ease',
                          boxShadow: activeFeature === index
                            ? `0 10px 30px ${alpha(feature.color, 0.4)}`
                            : 'none'
                        }}
                      >
                        {feature.icon}
                      </Box>
                    </motion.div>

                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        flexGrow: 0,
                        color: activeFeature === index ? feature.color : 'text.primary',
                        transition: 'color 0.4s ease'
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.7,
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      {feature.description}
                    </Typography>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={activeFeature === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Chip
                        label={feature.stats}
                        size="small"
                        sx={{
                          background: feature.gradient,
                          color: 'white',
                          fontWeight: 600,
                          '& .MuiChip-label': {
                            px: 2
                          }
                        }}
                      />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05), py: { xs: 8, md: 10 } }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box sx={{ mb: 3 }}>
              <Verified sx={{ fontSize: 64, color: 'primary.main' }} />
            </Box>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ fontWeight: 800, mb: 3 }}
            >
              Ready to Secure Your Digital Future?
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ mb: 5, lineHeight: 1.7, fontSize: '1.2rem' }}
            >
              Join thousands who trust us with their digital legacy. Start your secure inheritance plan today 
              with our AI-powered platform and experience the future of digital estate management.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AutoAwesome />}
              onClick={() => navigate('/register')}
              sx={{
                background: 'var(--primary-gradient)',
                px: 5,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 700,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(14, 165, 233, 0.3)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 40px rgba(14, 165, 233, 0.4)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              Get Started Now - Free Trial
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: 'grey.900', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Shield sx={{ mr: 1, fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Digital Legacy Platform
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                © 2024 Digital Legacy Platform. All rights reserved.<br />
                Built for Hackathon Demo | Powered by AI & Advanced Security
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, gap: 1 }}>
                <IconButton color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                  <GitHub />
                </IconButton>
                <IconButton color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                  <LinkedIn />
                </IconButton>
                <IconButton color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                  <Twitter />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
