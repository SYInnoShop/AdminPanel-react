import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import UserManagement from './components/UserManagement';
import { HomePage } from './components/HomePage';
import { useIsAuthenticated } from '@azure/msal-react';
import { SignOutButton } from './auth/SignOutButton';
import { SignInButton } from './auth/SignInButton';
import ProtectedRoute from './auth/ProtectedRoute';

const App: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            InnoShop-Admin Panel
          </Typography>
          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </Toolbar>
      </AppBar>

      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/users"
          disabled={!isAuthenticated}
        >
          Users
        </Button>
      </Toolbar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;