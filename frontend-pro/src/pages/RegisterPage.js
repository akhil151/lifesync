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
  Checkbox,
  FormControlLabel,
  useTheme,
  alpha,
  LinearProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Shield,
  ArrowBack,
  Google,
  Apple,
  Microsoft,
  Security,
  CheckCircle
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'agreeToTerms' ? checked : value
    });
    setError('');

    // Calculate password strength
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength += 25;
      if (/[A-Z]/.test(value)) strength += 25;
      if (/[0-9]/.test(value)) strength += 25;
      if (/[^A-Za-z0-9]/.test(value)) strength += 25;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    // Simulate registration process
    setTimeout(() => {
      navigate('/dashboard');
      setLoading(false);
    }, 2000);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'error';
    if (passwordStrength < 75) return 'warning';
    return 'success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Very Weak';
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'var(--primary-gradient)',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
              p: 4,
              borderRadius: 4,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'var(--primary-gradient)',
                  mb: 2
                }}
              >
                <Shield sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Create Your Account
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Start securing your digital legacy today
              </Typography>
              <Chip
                label="🚀 Free Trial - No Credit Card Required"
                size="small"
                sx={{
                  mt: 2,
                  background: alpha(theme.palette.success.main, 0.1),
                  color: 'success.main',
                  fontWeight: 600
                }}
              />
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* Registration Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Stack>

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />

              {/* Password Strength Indicator */}
              {formData.password && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Password Strength
                    </Typography>
                    <Typography variant="body2" color={`${getPasswordStrengthColor()}.main`}>
                      {getPasswordStrengthText()}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength}
                    color={getPasswordStrengthColor()}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
              )}

              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />

              {/* Terms and Conditions */}
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Link to="/terms" style={{ color: theme.palette.primary.main }}>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" style={{ color: theme.palette.primary.main }}>
                      Privacy Policy
                    </Link>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  background: 'var(--primary-gradient)',
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  mb: 3,
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 8px 25px rgba(14, 165, 233, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Box>

            {/* Social Registration */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Divider sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Or sign up with
                </Typography>
              </Divider>

              <Stack direction="row" spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  sx={{
                    py: 1.2,
                    borderRadius: 2,
                    borderColor: 'grey.300',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'grey.400',
                      backgroundColor: 'grey.50'
                    }
                  }}
                >
                  Google
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Apple />}
                  sx={{
                    py: 1.2,
                    borderRadius: 2,
                    borderColor: 'grey.300',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'grey.400',
                      backgroundColor: 'grey.50'
                    }
                  }}
                >
                  Apple
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Microsoft />}
                  sx={{
                    py: 1.2,
                    borderRadius: 2,
                    borderColor: 'grey.300',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'grey.400',
                      backgroundColor: 'grey.50'
                    }
                  }}
                >
                  Microsoft
                </Button>
              </Stack>
            </Box>

            {/* Footer Links */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  to="/login"
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  Sign in here
                </Link>
              </Typography>
            </Box>

            {/* Security Features */}
            <Box
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: alpha(theme.palette.success.main, 0.1),
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle sx={{ fontSize: 20, color: 'success.main', mr: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                  Your account will be protected with
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                • Military-grade AES-256 encryption<br />
                • Zero-knowledge architecture<br />
                • Biometric authentication support<br />
                • Multi-factor authentication
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default RegisterPage;
