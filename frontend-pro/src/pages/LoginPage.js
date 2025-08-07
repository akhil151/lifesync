import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  Chip,
  Stack,
  useTheme,
  alpha,
  CircularProgress,
  Fade,
  Slide
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import {
  Visibility,
  VisibilityOff,
  Fingerprint,
  Shield,
  ArrowBack,
  Google,
  Apple,
  Microsoft,
  Security
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login, socialLogin, biometricLogin, loading: authLoading, dbConnected } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'biometric'

  // Check for biometric support on component mount
  React.useEffect(() => {
    if (window.navigator.credentials && window.PublicKeyCredential) {
      setBiometricSupported(true);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate input
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      // Attempt login with zero-knowledge encryption
      const result = await login({
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    if (!formData.email) {
      setError('Please enter your email address first');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate biometric data capture (in real app, this would use WebAuthn API)
      const biometricData = await simulateBiometricCapture();

      const result = await biometricLogin(formData.email, biometricData);

      if (result.success) {
        setSuccess('Biometric authentication successful! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      setError(error.message || 'Biometric authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const simulateBiometricCapture = async () => {
    // Simulate biometric data capture
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would be actual biometric data
        resolve(`biometric_${formData.email}_${Date.now()}`);
      }, 1000);
    });
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await socialLogin(provider);

      if (result.success) {
        setSuccess(`${provider} login successful! Redirecting...`);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      setError(error.message || `${provider} login failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #059669 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          animation: 'float 8s ease-in-out infinite'
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Database Connection Status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{
            textAlign: 'center',
            mb: 2,
            p: 1,
            borderRadius: 2,
            backgroundColor: dbConnected ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
            border: `1px solid ${dbConnected ? 'rgba(34, 197, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
          }}>
            <Typography variant="caption" sx={{
              color: dbConnected ? 'success.main' : 'warning.main',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}>
              <Box sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: dbConnected ? 'success.main' : 'warning.main',
                animation: 'pulse 2s infinite'
              }} />
              {dbConnected ? 'Database Connected' : 'Demo Mode - Mock Data'}
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          {/* Back Button */}
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            sx={{
              color: 'white',
              mb: 3,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Back to Home
          </Button>

          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 6,
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #1e40af, #7c3aed, #059669)',
              }
            }}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Box sx={{ textAlign: 'center', mb: 5 }}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 200 }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
                      mb: 3,
                      boxShadow: '0 10px 30px rgba(30, 64, 175, 0.3)',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: -4,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1e40af, #7c3aed, #059669)',
                        zIndex: -1,
                        opacity: 0.7,
                        filter: 'blur(8px)'
                      }
                    }}
                  >
                    <Shield sx={{ fontSize: 50, color: 'white' }} />
                  </Box>
                </motion.div>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Welcome Back
                </Typography>

                <Typography variant="h6" color="text.secondary" sx={{ mb: 3, fontWeight: 400 }}>
                  Sign in to your Digital Legacy account
                </Typography>

                <Stack direction="row" spacing={1} justifyContent="center">
                  <Chip
                    label="🔐 Zero-Knowledge Encryption"
                    size="small"
                    sx={{
                      background: alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                      fontWeight: 600,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                    }}
                  />
                  <Chip
                    label="🛡️ Military-Grade Security"
                    size="small"
                    sx={{
                      background: alpha(theme.palette.success.main, 0.1),
                      color: 'success.main',
                      fontWeight: 600,
                      border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                    }}
                  />
                </Stack>
              </Box>
            </motion.div>

            {/* Error/Success Alerts */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      borderRadius: 3,
                      fontWeight: 500,
                      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)'
                    }}
                  >
                    {error}
                  </Alert>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert
                    severity="success"
                    sx={{
                      mb: 3,
                      borderRadius: 3,
                      fontWeight: 500,
                      boxShadow: '0 4px 12px rgba(34, 197, 94, 0.15)'
                    }}
                  >
                    {success}
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <Box sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={loading || authLoading}
                    placeholder="Enter your email address"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        fontSize: '1.1rem',
                        height: '56px',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                            borderWidth: '2px'
                          }
                        },
                        '&.Mui-focused': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '2px'
                          }
                        }
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '1.1rem',
                        fontWeight: 500
                      }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={loading || authLoading}
                    placeholder="Enter your password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            disabled={loading || authLoading}
                            sx={{ mr: 1 }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        fontSize: '1.1rem',
                        height: '56px',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                            borderWidth: '2px'
                          }
                        },
                        '&.Mui-focused': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '2px'
                          }
                        }
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '1.1rem',
                        fontWeight: 500
                      }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading || authLoading || !formData.email || !formData.password}
                    sx={{
                      background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
                      py: 2.5,
                      borderRadius: 3,
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      textTransform: 'none',
                      height: '56px',
                      boxShadow: '0 8px 32px rgba(30, 64, 175, 0.3)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(30, 64, 175, 0.4)',
                        background: 'linear-gradient(135deg, #1d4ed8 0%, #8b5cf6 100%)'
                      },
                      '&:disabled': {
                        background: 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)',
                        transform: 'none',
                        color: 'rgba(255, 255, 255, 0.7)'
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {loading || authLoading ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CircularProgress size={20} color="inherit" />
                        Signing In...
                      </Box>
                    ) : (
                      'Sign In Securely'
                    )}
                  </Button>
                </Box>

                {/* Forgot Password Link */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      setSuccess('Password reset functionality will be available in the full version');
                    }}
                    sx={{
                      color: 'primary.main',
                      fontWeight: 500,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Forgot your password?
                  </Link>
                </Box>
              </Box>
            </motion.div>

            {/* Biometric Login */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Box sx={{ mb: 4 }}>
                <Divider sx={{ mb: 4 }}>
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, px: 3 }}>
                    Or continue with advanced security
                  </Typography>
                </Divider>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<Fingerprint sx={{ fontSize: '1.5rem' }} />}
                  onClick={handleBiometricLogin}
                  disabled={loading || authLoading || !formData.email}
                  sx={{
                    py: 2.5,
                    borderRadius: 3,
                    borderWidth: 2,
                    borderColor: 'secondary.main',
                    color: 'secondary.main',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    height: '56px',
                    textTransform: 'none',
                    mb: 2,
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(124, 58, 237, 0.2)'
                    },
                    '&:disabled': {
                      borderColor: 'grey.300',
                      color: 'grey.400',
                      transform: 'none'
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {loading || authLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CircularProgress size={20} color="inherit" />
                      Authenticating...
                    </Box>
                  ) : (
                    'Biometric Authentication'
                  )}
                </Button>

                {!formData.email && (
                  <Box sx={{ textAlign: 'center', mt: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{
                      fontStyle: 'italic',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1
                    }}>
                      💡 Enter your email address to enable biometric login
                    </Typography>
                  </Box>
                )}
              </Box>
            </motion.div>

            {/* Social Login */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Box sx={{ mb: 4 }}>
                <Divider sx={{ mb: 4 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, px: 3 }}>
                    Or sign in with
                  </Typography>
                </Divider>

                <Stack direction="row" spacing={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Google sx={{ fontSize: '1.2rem' }} />}
                    onClick={() => handleSocialLogin('Google')}
                    disabled={loading || authLoading}
                    sx={{
                      py: 2,
                      borderRadius: 3,
                      borderWidth: 1.5,
                      borderColor: 'grey.300',
                      color: 'text.primary',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      height: '48px',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#4285f4',
                        borderWidth: 1.5,
                        backgroundColor: alpha('#4285f4', 0.05),
                        color: '#4285f4',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(66, 133, 244, 0.2)'
                      },
                      '&:disabled': {
                        borderColor: 'grey.200',
                        color: 'grey.400',
                        transform: 'none'
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {loading && 'Google' ? (
                      <CircularProgress size={16} />
                    ) : (
                      'Google'
                    )}
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Apple sx={{ fontSize: '1.2rem' }} />}
                    onClick={() => handleSocialLogin('Apple')}
                    disabled={loading || authLoading}
                    sx={{
                      py: 2,
                      borderRadius: 3,
                      borderWidth: 1.5,
                      borderColor: 'grey.300',
                      color: 'text.primary',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      height: '48px',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#000000',
                        borderWidth: 1.5,
                        backgroundColor: alpha('#000000', 0.05),
                        color: '#000000',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      },
                      '&:disabled': {
                        borderColor: 'grey.200',
                        color: 'grey.400',
                        transform: 'none'
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {loading && 'Apple' ? (
                      <CircularProgress size={16} />
                    ) : (
                      'Apple'
                    )}
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Microsoft sx={{ fontSize: '1.2rem' }} />}
                    onClick={() => handleSocialLogin('Microsoft')}
                    disabled={loading || authLoading}
                    sx={{
                      py: 2,
                      borderRadius: 3,
                      borderWidth: 1.5,
                      borderColor: 'grey.300',
                      color: 'text.primary',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      height: '48px',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#0078d4',
                        borderWidth: 1.5,
                        backgroundColor: alpha('#0078d4', 0.05),
                        color: '#0078d4',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0, 120, 212, 0.2)'
                      },
                      '&:disabled': {
                        borderColor: 'grey.200',
                        color: 'grey.400',
                        transform: 'none'
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {loading && 'Microsoft' ? (
                      <CircularProgress size={16} />
                    ) : (
                      'Microsoft'
                    )}
                  </Button>
                </Stack>
              </Box>
            </motion.div>

            {/* Footer Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Box sx={{
                textAlign: 'center',
                pt: 3,
                borderTop: '1px solid',
                borderColor: 'divider'
              }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Don't have an account?
                </Typography>
                <Button
                  component={Link}
                  to="/register"
                  variant="text"
                  size="large"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      transform: 'translateY(-1px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Create New Account
                </Button>
              </Box>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  backgroundColor: alpha(theme.palette.success.main, 0.08),
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                  textAlign: 'center'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                  <Shield sx={{ fontSize: 24, color: 'success.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                    Zero-Knowledge Security
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Your data is protected with military-grade AES-256 encryption.
                  <br />
                  <strong>We cannot see your information</strong> - only you have the keys.
                </Typography>
              </Box>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoginPage;
