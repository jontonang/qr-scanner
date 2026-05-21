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

// QR Scanner Input Handler for USB/Bluetooth Scanner
let scanTimeout;
let lastScannedData = '';
let lastScanTime = 0;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('QR Scanner Input System initialized');
    setupScannerInput();
    loadAttendanceLog();
});

// Setup scanner input handling
function setupScannerInput() {
    const qrInput = document.getElementById('qrInput');
    const scanIndicator = document.getElementById('scanIndicator');
    
    // Keep input focused at all times
    qrInput.focus();
    
    // Refocus if user clicks elsewhere
    document.addEventListener('click', function() {
        qrInput.focus();
    });
    
    // Handle input from scanner
    qrInput.addEventListener('input', function(e) {
        // Show scanning indicator
        scanIndicator.className = 'scan-indicator scanning';
        scanIndicator.innerHTML = '<span class="pulse"></span> Scanning...';
        
        // Clear previous timeout
        clearTimeout(scanTimeout);
    });
    
    // Handle Enter key (scanner sends this after scan)
    qrInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            const scannedData = this.value.trim();
            const currentTime = Date.now();
            
            // Prevent duplicate scans (within 2 seconds)
            if (scannedData === lastScannedData && 
                (currentTime - lastScanTime) < 2000) {
                console.log('Duplicate scan ignored');
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

// Process the scanned data
function processScannedData(data) {
    const eventSelect = document.getElementById('eventSelect');
    
    // Check if event is selected
    if (!eventSelect.value) {
        showStatus('⚠️ Please select an event first!', 'error');
        playErrorSound();
        return;
    }
    
    try {
        let attendeeData;
        
        // Try to parse as JSON
        try {
            attendeeData = JSON.parse(data);
            
            // Validate required fields
            if (!attendeeData.name) {
                throw new Error('Name field missing');
            }
        } catch (e) {
            // If not JSON, treat as plain text (name only)
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
        playSuccessSound();
        
    } catch (error) {
        console.error('Error processing QR code:', error);
        showStatus('❌ Error: Invalid QR code format', 'error');
        playErrorSound();
    }
}

// Clear input function
function clearInput() {
    const qrInput = document.getElementById('qrInput');
    qrInput.value = '';
    qrInput.focus();
    showStatus('Input cleared', 'success');
}

// Manual submit function
function manualSubmit() {
    const qrInput = document.getElementById('qrInput');
    const data = qrInput.value.trim();
    
    if (data) {
        processScannedData(data);
        qrInput.value = '';
    } else {
        showStatus('Please enter data first', 'error');
    }
    
    qrInput.focus();
}

// Play success sound (optional)
function playSuccessSound() {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Play error sound (optional)
function playErrorSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Keep the existing functions from before:
// - displayAttendeeInfo()
// - recordAttendance()
// - saveAttendanceLog()
// - loadAttendanceLog()
// - updateLogDisplay()
// - sendToExcel()
// - showStatus()

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
