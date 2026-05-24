// ===================================
// Configuration File
// Annual Gathering 2026 - QR Attendance Scanner
// ===================================

const CONFIG = {
    // Fixed Event Name
    eventName: "Annual Gathering 2026",
    
    // Google Sheets Configuration
    // Replace with your Google Apps Script Web App URL
    googleSheetsURL: "https://docs.google.com/spreadsheets/d/1-M2sKFQOfQ_gt2J7jlSsZNdGMidzBrXzgKRdMJH-JhI/edit?usp=drivesdk",
    
    // Google Sheet Tab Names
    sheetTabs: {
        attendance: "Annual Gathering 2026",  // Main attendance sheet
        nameList: "Name List"                  // Pre-registered attendees list
    },
    
    // Test Mode
    // Set to true for testing without Google Sheets
    // Set to false for production use
    testMode: true,
    
    // Auto-save interval (milliseconds)
    // How often to retry failed syncs
    autoSaveInterval: 5 * 60 * 1000, // 5 minutes
    
    // Display Settings
    display: {
        showResultDuration: 5000,      // How long to show scan result (ms)
        maxLogEntries: 50,              // Maximum entries to show in log
        enableSound: true,              // Enable beep sounds
        autoFocusInput: true            // Keep input focused
    },
    
    // Data Format
    dateFormat: {
        locale: 'en-SG',                // Singapore locale
        options: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }
    },
    
    // CSV Export Settings
    csvExport: {
        filename: 'Event_Attendance',
        includeHeaders: true,
        delimiter: ','
    },
    
    // Duplicate Prevention
    // Prevent same person from being scanned multiple times within this period
    duplicatePreventionWindow: 2000, // 2 seconds
    
    // Version
    version: '1.0.0',
    lastUpdated: '2024-01-15'
};

// ===================================
// Do not modify below this line
// ===================================

// Freeze config to prevent accidental modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.sheetTabs);
Object.freeze(CONFIG.display);
Object.freeze(CONFIG.dateFormat);
Object.freeze(CONFIG.csvExport);
