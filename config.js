// Configuration for Microsoft Graph API and Excel Integration
const CONFIG = {
    // Your SharePoint sharing link
    sharePointLink: "https://groupncs-my.sharepoint.com/:x:/r/personal/jia_lian_ang_ncs_co/Documents/Event_Attendance.xlsx?d=w0f4095044ea34a2fa2b3aa52763a6778&csf=1&web=1&e=vFWp4a",
    
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
