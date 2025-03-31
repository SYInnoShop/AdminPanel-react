import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { apiConfig } from '../authConfig';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

export const SignOutButton = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogout = () => {
    instance.clearCache();
    debugger
    instance.logoutRedirect({
      postLogoutRedirectUri: apiConfig.siteUri,
      authority: apiConfig.uri 
    }).then(() => {
      window.location.href = "/";
    }).catch(error => {
      console.error("Logout failed:", error);
      window.location.href = apiConfig.siteUri;
    });
  };

  if (!isAuthenticated) return null;

  return (
    <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
      Sign Out
    </Button>
  );
};