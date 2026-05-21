// Configuration for Microsoft Graph API and Excel Integration
const CONFIG = {
    // Your SharePoint sharing link
    sharePointLink: "YOUR_SHAREPOINT_SHARING_LINK_HERE",
    
    // Excel details
    excel: {
        worksheetName: "Annual Gathering 2026",
        tableName: "AttendanceTable"
    },
    
    // Test mode
    testMode: false
};

    // For testing without Excel integration
    testMode: true  // Set to false when ready to use Excel
};

// Sample QR Code format
// Your QR codes should contain JSON data like this:
// {"name": "John Tan", "email": "john.tan@example.com"}
