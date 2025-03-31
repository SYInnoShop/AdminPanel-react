import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { MsalProvider } from "@azure/msal-react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { msalInstance, initializeMsal } from "./msalInstance";
import { setupInterceptors } from "./api/interceptors";
import "./index.css";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
});

const AppWrapper = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
debugger
      try {
        await initializeMsal();
        setupInterceptors(axios);
        setInitialized(true);
      } catch (error) {
        console.error("Initialization error:", error);
        setInitialized(true);
      }
    };
    
    init();
  }, []);

  if (!initialized) {
    return <div>Loading authentication...</div>;
  }

  return (
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </MsalProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<AppWrapper />);