import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to User Management
      </Typography>
      
      <AuthenticatedTemplate>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate('/users')}
          sx={{ mt: 3 }}
        >
          Go to User Management
        </Button>
      </AuthenticatedTemplate>
      
      <UnauthenticatedTemplate>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Please sign in to access the user management system.
        </Typography>
      </UnauthenticatedTemplate>
    </Box>
  );
};