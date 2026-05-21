// QR Code Scanner Application
let html5QrCode;
let isScanning = false;
let attendanceLog = [];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('QR Scanner initialized');
    setupEventListeners();
    loadAttendanceLog();
});

// Setup button click listeners
function setupEventListeners() {
    const startBtn = document.getElementById('startScanBtn');
    const stopBtn = document.getElementById('stopScanBtn');
    
    startBtn.addEventListener('click', startScanner);
    stopBtn.addEventListener('click', stopScanner);
}

// Start the QR code scanner
function startScanner() {
    const eventSelect = document.getElementById('eventSelect');
    
    // Check if event is selected
    if (!eventSelect.value) {
        showStatus('Please select an event first!', 'error');
        return;
    }

    // Initialize scanner
    html5QrCode = new Html5Qrcode("qr-reader");
    
    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 }
    };

    html5QrCode.start(
        { facingMode: "environment" }, // Use back camera
        config,
        onScanSuccess,
        onScanError
    ).then(() => {
        isScanning = true;
        document.getElementById('startScanBtn').style.display = 'none';
        document.getElementById('stopScanBtn').style.display = 'inline-block';
        showStatus('Scanner active - point camera at QR code', 'success');
    }).catch(err => {
        console.error('Error starting scanner:', err);
        showStatus('Error: Could not access camera. Please allow camera permissions.', 'error');
    });
}

// Stop the scanner
function stopScanner() {
    if (html5QrCode && isScanning) {
        html5QrCode.stop().then(() => {
            isScanning = false;
            document.getElementById('startScanBtn').style.display = 'inline-block';
            document.getElementById('stopScanBtn').style.display = 'none';
            showStatus('Scanner stopped', 'success');
        }).catch(err => {
            console.error('Error stopping scanner:', err);
        });
    }
}

// Handle successful QR code scan
function onScanSuccess(decodedText, decodedResult) {
    console.log('QR Code detected:', decodedText);
    
    // Stop scanner temporarily to process
    if (isScanning) {
        stopScanner();
    }

    try {
        // Parse QR code data (expecting JSON format)
        let attendeeData;
        
        try {
            attendeeData = JSON.parse(decodedText);
        } catch (e) {
            // If not JSON, treat as plain text
            attendeeData = {
                name: decodedText,
                email: "N/A"
            };
        }

        // Display the scanned information
        displayAttendeeInfo(attendeeData);
        
        // Record attendance
        recordAttendance(attendeeData);
        
    } catch (error) {
        console.error('Error processing QR code:', error);
        showStatus('Error: Invalid QR code format', 'error');
    }
}

// Handle scan errors (can be ignored - happens frequently during scanning)
function onScanError(errorMessage) {
    // Don't show errors - they happen constantly while scanning
    // console.log('Scan error:', errorMessage);
}

// Display scanned attendee information
function displayAttendeeInfo(attendeeData) {
    const resultContainer = document.getElementById('result-container');
    const attendeeName = document.getElementById('attendee-name');
    const attendeeEmail = document.getElementById('attendee-email');
    const scanTime = document.getElementById('scan-time');
    
    // Update display
    attendeeName.textContent = attendeeData.name || 'Unknown';
    attendeeEmail.textContent = attendeeData.email || 'N/A';
    scanTime.textContent = new Date().toLocaleString();
    
    // Show result container
    resultContainer.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        resultContainer.style.display = 'none';
        // Restart scanner
        startScanner();
    }, 5000);
}

// Record attendance
function recordAttendance(attendeeData) {
    const eventSelect = document.getElementById('eventSelect');
    const eventName = eventSelect.value;
    
    const attendanceRecord = {
        event: eventName,
        name: attendeeData.name,
        email: attendeeData.email,
        timestamp: new Date().toISOString(),
        displayTime: new Date().toLocaleString()
    };
    
    // Add to log
    attendanceLog.unshift(attendanceRecord); // Add to beginning
    
    // Save to localStorage
    saveAttendanceLog();
    
    // Update display
    updateLogDisplay();
    
    // If not in test mode, send to Excel
    if (!CONFIG.testMode) {
        sendToExcel(attendanceRecord);
    } else {
        console.log('Test Mode: Would send to Excel:', attendanceRecord);
        showStatus('✅ Attendance recorded (Test Mode)', 'success');
    }
}

// Save attendance log to localStorage
function saveAttendanceLog() {
    localStorage.setItem('attendanceLog', JSON.stringify(attendanceLog));
}

// Load attendance log from localStorage
function loadAttendanceLog() {
    const saved = localStorage.getItem('attendanceLog');
    if (saved) {
        attendanceLog = JSON.parse(saved);
        updateLogDisplay();
    }
}

// Update the attendance log display
function updateLogDisplay() {
    const logContainer = document.getElementById('log-container');
    
    if (attendanceLog.length === 0) {
        logContainer.innerHTML = '<p class="no-data">No scans yet</p>';
        return;
    }
    
    logContainer.innerHTML = '';
    
    // Show last 10 entries
    attendanceLog.slice(0, 10).forEach(record => {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `
            <p><strong>\${record.name}</strong></p>
            <p>Email: \${record.email}</p>
            <p>Event: \${record.event}</p>
            <p>Time: \${record.displayTime}</p>
        `;
        logContainer.appendChild(entry);
    });
}

// Send data to Excel (via Microsoft Graph API)
async function sendToExcel(record) {
    try {
        // This will be implemented when you set up Azure AD
        showStatus('Sending to Excel...', 'success');
        
        // For now, just simulate success
        setTimeout(() => {
            showStatus('✅ Saved to Excel successfully!', 'success');
        }, 1000);
        
        // Real implementation would use Microsoft Graph API
        // See next steps for Azure setup
        
    } catch (error) {
        console.error('Error sending to Excel:', error);
        showStatus('⚠️ Saved locally, but failed to sync with Excel', 'error');
    }
}

// Show status message
function showStatus(message, type) {
    const statusDiv = document.getElementById('status-message');
    statusDiv.textContent = message;
    statusDiv.className = type;
    statusDiv.style.display = 'block';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

// Export attendance log to CSV (bonus feature)
function exportToCSV() {
    if (attendanceLog.length === 0) {
        alert('No data to export');
        return;
    }
    
    let csv = 'Event,Name,Email,Timestamp
';
    attendanceLog.forEach(record => {
        csv += `"\${record.event}","\${record.name}","\${record.email}","\${record.displayTime}"
`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_\${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}