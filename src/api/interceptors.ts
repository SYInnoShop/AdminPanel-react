import { AxiosInstance } from 'axios';
import { msalInstance } from '../msalInstance';
import { loginRequest } from '../authConfig';


export const setupInterceptors = (client: AxiosInstance) => {
  client.interceptors.request.use(async (config) => {
    try {
      const account = msalInstance.getActiveAccount();
      if (!account) {
        throw new Error("No active account");
      }

      const tokenResponse = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account
      });

      if (tokenResponse?.accessToken) {
        config.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
      }
      return config;
    } catch (error) {
      console.error("Token acquisition failed:", error);
      throw error;
    }
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        try {
          const tokenResponse = await msalInstance.acquireTokenPopup(loginRequest);
          if (tokenResponse?.accessToken) {
            error.config.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
            return client(error.config);
          }
        } catch (popupError) {
          console.error("Token refresh failed:", popupError);
          msalInstance.loginRedirect(loginRequest);
        }
      }
      return Promise.reject(error);
    }
  );
};