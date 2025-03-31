import { useMsal } from "@azure/msal-react";

export const useAuth = () => {
  const { instance, accounts } = useMsal();

  const login = () => {
    instance.loginPopup().catch((e) => console.error(e));
  };

  const logout = () => {
    instance.logoutPopup();
  };

  return { login, logout, user: accounts.length > 0 ? accounts[0] : null };
};