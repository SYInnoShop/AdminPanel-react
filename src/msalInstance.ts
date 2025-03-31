import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

export async function initializeMsal() {
  try {
    await msalInstance.initialize();
    
    const currentAccount = msalInstance.getActiveAccount();
    if (!currentAccount) {
      await msalInstance.handleRedirectPromise();
    }
    
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0]);
    }
    
    console.log("MSAL initialized successfully");
    return true;
  } catch (error) {
    console.error("MSAL initialization failed:", error);
    throw error;
  }
}