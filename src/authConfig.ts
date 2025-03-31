import { Configuration, LogLevel } from '@azure/msal-browser';

export const apiConfig = {
    uri: "https://innowiseshop.b2clogin.com/innowiseshop.onmicrosoft.com/B2C_1_susi",
    siteUri: "https://admin-panel-react-exc2ane3hxafcvdn.polandcentral-01.azurewebsites.net/"
};

export const msalConfig: Configuration = {
    auth: {
        clientId: "25be8d02-e44b-4fe1-8d91-41027e5b0f3e",
        authority: "https://innowiseshop.b2clogin.com/innowiseshop.onmicrosoft.com/B2C_1_susi",
        knownAuthorities: ["innowiseshop.b2clogin.com"],
        redirectUri: apiConfig.siteUri, 
        postLogoutRedirectUri: apiConfig.siteUri,
        navigateToLoginRequestUrl: true
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true, 
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {		
                    return;		
                }		
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    default:
                        console.log(message);
                        return;
                }	
            }
        },
        windowHashTimeout: 9000, 
        iframeHashTimeout: 9000
    }
};

export const loginRequest = {
    scopes: [
        "openid", 
        "profile", 
        "offline_access",
        "https://innowiseshop.onmicrosoft.com/2b6b5f43-6383-4d11-8ff6-7c372e966642/api.read"
    ],
    authority: "https://innowiseshop.b2clogin.com/innowiseshop.onmicrosoft.com/B2C_1_susi",
    extraQueryParameters: {
        p: 'B2C_1_susi',
        grant_type: 'authorization_code'
    },
    redirectUri: "https://admin-panel-react-exc2ane3hxafcvdn.polandcentral-01.azurewebsites.net/"
};

export const tokenRequest = {
    forceRefresh: false, 
    scopes: [
        "openid", 
        "profile", 
        "offline_access",
        "https://innowiseshop.onmicrosoft.com/2b6b5f43-6383-4d11-8ff6-7c372e966642/api.read"
    ],
    authority: "https://innowiseshop.b2clogin.com/innowiseshop.onmicrosoft.com/B2C_1_susi",
    extraQueryParameters: {
        p: 'B2C_1_susi',
        grant_type: 'authorization_code'
    }
};



