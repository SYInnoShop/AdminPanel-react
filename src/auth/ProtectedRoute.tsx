import { useIsAuthenticated } from '@azure/msal-react';
import { useEffect } from 'react';
import { msalInstance } from '../msalInstance';
import { loginRequest } from '../authConfig';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      msalInstance.loginRedirect({
        ...loginRequest,
        redirectStartPage: window.location.href,
        prompt: 'select_account'
    
      });
    }
  }, [isAuthenticated, msalInstance]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
