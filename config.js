// Configuration for Microsoft Graph API and Excel Integration
const CONFIG = {
    // Azure AD App Registration Details
    // You'll need to register an app in Azure Portal and fill these in
    msalConfig: {
        auth: {
            clientId: "YOUR_CLIENT_ID_HERE", // Replace with your Azure App Client ID
            authority: "https://login.microsoftonline.com/common",
            redirectUri: window.location.origin
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: false
        }
    },

    // Microsoft Graph API permissions needed
    loginRequest: {
        scopes: ["User.Read", "Files.ReadWrite"]
    },

    // Excel file configuration
    excel: {
        // You'll need to get these IDs from your OneDrive/SharePoint
        driveId: "YOUR_DRIVE_ID",  // Your OneDrive ID
        fileId: "YOUR_FILE_ID",     // Your Excel file ID
        worksheetName: "Attendance" // Name of the worksheet
    },

    // For testing without Excel integration
    testMode: true  // Set to false when ready to use Excel
};

// Sample QR Code format
// Your QR codes should contain JSON data like this:
// {"name": "John Tan", "email": "john.tan@example.com"}