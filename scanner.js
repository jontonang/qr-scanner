// ===================================
// QR Code Scanner Application
// Annual Gathering 2026 - Attendance System
// ===================================

// Global Variables
let attendanceLog = [];
let lastScannedData = '';
let lastScanTime = 0;
let totalScans = 0;
let todayScans = 0;
let retryQueue = [];

// ===================================
// Initialize Application
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('QR Scanner initialized');
    console.log('Event:', CONFIG.eventName);
    console.log('Test Mode:', CONFIG.testMode);
    
    setupScannerInput();
    loadAttendanceLog();
    updateStatistics();
    startAutoRetry();
    
    // Show test mode warning
    if (CONFIG.testMode) {
        showStatus('⚠️ Running in TEST MODE - Data will not sync to Google Sheets', 'warning');
    }
});

// ===================================
// Scanner Input Setup
// ===================================
function setupScannerInput() {
    const qrInput = document.getElementById('qrInput');
    const scanIndicator = document.getElementById('scanIndicator');
    
    // Keep input focused at all times
    if (CONFIG.display.autoFocusInput) {
        qrInput.focus();
        
        // Refocus if user clicks elsewhere
        document.addEventListener('click', function() {
            qrInput.focus();
        });
    }
    
    // Handle input from scanner
    qrInput.addEventListener('input', function(e) {
        // Show scanning indicator
        scanIndicator.className = 'scan-indicator scanning';
        scanIndicator.innerHTML = '<span class="pulse"></span> Scanning...';
    });
    
    // Handle Enter key (scanner sends this after scan)
    qrInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            const scannedData = this.value.trim();
            const currentTime = Date.now();
            
            // Prevent duplicate scans
            if (scannedData === lastScannedData && 
                (currentTime - lastScanTime) < CONFIG.duplicatePreventionWindow) {
                console.log('Duplicate scan ignored');
                showStatus('⚠️ Duplicate scan detected - please wait', 'warning');
                this.value = '';
                this.focus();
                return;
            }
            
            if (scannedData) {
                // Update last scan info
                lastScannedData = scannedData;
                lastScanTime = currentTime;
                
                // Process the scanned data
                processScannedData(scannedData);
                
                // Clear input for next scan
                this.value = '';
                
                // Show success indicator
                scanIndicator.className = 'scan-indicator success';
                scanIndicator.innerHTML = '<span class="pulse"></span> Scan Successful!';
                
                // Reset indicator after 2 seconds
                setTimeout(() => {
                    scanIndicator.className = 'scan-indicator';
                    scanIndicator.innerHTML = '<span class="pulse"></span> Ready to Scan';
                }, 2000);
            }
            
            // Keep focus
            this.focus();
        }
    });
    
    // Handle manual paste
    qrInput.addEventListener('paste', function(e) {
        setTimeout(() => {
            const pastedData = this.value.trim();
            if (pastedData) {
                processScannedData(pastedData);
                this.value = '';
            }
        }, 100);
    });
}

// ===================================
// Process Scanned Data
// ===================================
function processScannedData(data) {
    console.log('Processing scanned data:', data);
    
    try {
        let attendeeData;
        
        // Try to parse as JSON
        try {
            attendeeData = JSON.parse(data);
            
            // Validate required fields
            if (!attendeeData.name) {
                throw new Error('Name field missing in QR code');
            }
        } catch (e) {
            // If not JSON, treat as plain text (name only)
            console.log('QR code is not JSON, treating as plain text');
            attendeeData = {
                name: data,
                email: "N/A"
            };
        }
        
        // Display the scanned information
        displayAttendeeInfo(attendeeData);
        
        // Record attendance
        recordAttendance(attendeeData);
        
        // Play success sound
        if (CONFIG.display.enableSound) {
            playSuccessSound();
        }
        
    } catch (error) {
        console.error('Error processing QR code:', error);
        showStatus('❌ Error: Invalid QR code format - ' + error.message, 'error');
        
        if (CONFIG.display.enableSound) {
            playErrorSound();
        }
    }
}

// ===================================
// Display Attendee Information
// ===================================
function displayAttendeeInfo(attendeeData) {
    const resultContainer = document.getElementById('result-container');
    const attendeeName = document.getElementById('attendee-name');
    const attendeeEmail = document.getElementById('attendee-email');
    const scanTime = document.getElementById('scan-time');
    
    // Update display
    attendeeName.textContent = attendeeData.name || 'Unknown';
    attendeeEmail.textContent = attendeeData.email || 'N/A';
    scanTime.textContent = formatDateTime(new Date());
    
    // Show result container
    resultContainer.style.display = 'block';
    
    // Auto-hide after configured duration
    setTimeout(() => {
        resultContainer.style.display = 'none';
    }, CONFIG.display.showResultDuration);
}

// ===================================
// Record Attendance
// ===================================
function recordAttendance(attendeeData) {
    // Create attendance record
    const attendanceRecord = {
        event: CONFIG.eventName,
        name: attendeeData.name,
        email: attendeeData.email,
        timestamp: new Date().toISOString(),
        displayTime: formatDateTime(new Date()),
        status: 'Checked In'
    };
    
    // Add to log (at beginning)
    attendanceLog.unshift(attendanceRecord);
    
    // Limit log size
    if (attendanceLog.length > CONFIG.display.maxLogEntries) {
        attendanceLog = attendanceLog.slice(0, CONFIG.display.maxLogEntries);
    }
    
    // Save to localStorage
    saveAttendanceLog();
    
    // Update display
    updateLogDisplay();
    updateStatistics();
    
    // Send to Google Sheets
    if (!CONFIG.testMode) {
        sendToGoogleSheets(attendanceRecord);
    } else {
        console.log('Test Mode: Would send to Google Sheets:', attendanceRecord);
        showStatus('✅ Attendance recorded (Test Mode - Not synced)', 'success');
    }
}

// ===================================
// Send Data to Google Sheets
// ===================================
async function sendToGoogleSheets(record) {
    try {
        showStatus('💾 Saving to Google Sheets...', 'success');
        
        // Prepare data for Google Sheets
        const data = {
            sheetTab: CONFIG.sheetTabs.attendance,
            eventName: record.event,
            attendeeName: record.name,
            attendeeEmail: record.email,
            timestamp: record.timestamp,
            displayTime: record.displayTime,
            status: record.status
        };
        
        // Send to Google Apps Script
        const response = await fetch(CONFIG.googleSheetsURL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        // Note: no-cors mode doesn't allow reading response
        // Assume success if no error thrown
        console.log('Data sent to Google Sheets:', data);
        showStatus('✅ Saved to Google Sheets successfully!', 'success');
        updateLastSyncTime();
        
    } catch (error) {
        console.error('Error sending to Google Sheets:', error);
        showStatus('⚠️ Saved locally - Will retry sync later', 'error');
        
        // Add to retry queue
        saveToRetryQueue(record);
    }
}

// ===================================
// Retry Queue Management
// ===================================
function saveToRetryQueue(record) {
    retryQueue = JSON.parse(localStorage.getItem('retryQueue
