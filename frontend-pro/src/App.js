import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { AIProvider } from './contexts/AIContext';

// Import all pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AccountManager from './pages/AccountManager';
import DocumentManager from './pages/DocumentManager';
import LoanManager from './pages/LoanManager';
import HeirManager from './pages/HeirManager';
import EmergencyPortal from './pages/EmergencyPortal';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AIAssistant from './pages/AIAssistant';

// Import layout components (will be created)
// import Navbar from './components/Navbar';
// import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AIProvider>
          <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/emergency" element={<EmergencyPortal />} />
        
        {/* Protected Routes (simplified for now) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<AccountManager />} />
        <Route path="/documents" element={<DocumentManager />} />
        <Route path="/loans" element={<LoanManager />} />
        <Route path="/heirs" element={<HeirManager />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        
        {/* 404 Page */}
        <Route path="*" element={
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            flexDirection: 'column',
            textAlign: 'center'
          }}>
            <Box sx={{ fontSize: '6rem', mb: 2 }}>🔍</Box>
            <Box sx={{ fontSize: '2rem', fontWeight: 'bold', mb: 1 }}>Page Not Found</Box>
            <Box sx={{ color: 'text.secondary' }}>The page you're looking for doesn't exist.</Box>
          </Box>
        } />
        </Routes>
      </Box>
    </AIProvider>
  </DataProvider>
</AuthProvider>
);
}

export default App;
