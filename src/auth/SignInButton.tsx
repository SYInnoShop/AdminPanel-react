import { useMsal } from '@azure/msal-react';
import { loginRequest } from "../authConfig";
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

export const SignInButton: React.FC = () => {
    const { instance } = useMsal();
  
    const handleLogin = async () => {
        try {
            await instance.loginRedirect({
                ...loginRequest,
                redirectStartPage: window.location.href,
                prompt: 'select_account'
            });
            
            instance.handleRedirectPromise()
              .then(response => {
                if (response) {
                  console.log('Token received:', response.accessToken);
                  window.location.reload();
                }
              });
          } catch (error) {
            console.error("Login error:", error);
          }
    };
  
    return (
      <Button 
        color="inherit" 
        onClick={handleLogin} 
        startIcon={<LoginIcon />}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }
        }}
      >
        Sign In
      </Button>
    );
};