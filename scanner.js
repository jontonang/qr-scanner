let attendanceLog = [];
let lastScannedData = '';
let lastScanTime = 0;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Scanner initialized');
    setupScanner();
    loadSavedData();
    updateDisplay();
});

function setupScanner() {
    const input = document.getElementById('qrInput');
    const status = document.getElementById('scanStatus');
    
    input.focus();
    
    document.addEventListener('click', function() {
        input.focus();
    });
    
    input.addEventListener('input', function() {
        status.textContent = 'Scanning...';
        status.style.background = '#fff3cd';
        status.style.color = '#856404';
    });
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const data = this.value.trim();
            const currentTime = Date.now();
            
            if (data === lastScannedData && (currentTime - lastScanTime) < 2000) {
                console.log('Duplicate scan ignored');
                this.value = '';
                return;
            }
            
            if (data) {
                lastScannedData = data;
                lastScanTime = currentTime;
                processData(data);
                this.value = '';
                
                status.textContent = 'Scan successful!';
                status.style.background = '#d4edda';
                status.style.color = '#155724';
                
                setTimeout(() => {
                    status.textContent = 'Ready to scan';
                    status.style.background = '#d4edda';
                    status.style.color = '#155724';
                }, 2000);
            }
            
            this.focus();
        }
    });
}

function processData(data) {
    console.log('Processing:', data);
    
    let attendee = { name: data, email: 'N/A' };
    
    try {
        const parsed = JSON.parse(data);
        if (parsed.name) {
            attendee = parsed;
        }
    } catch(e) {
        if (data.includes(',')) {
            const parts = data.split(',').map(p => p.trim());
            attendee = {
                name: parts[0] || 'Unknown',
                email: parts[1] || 'N/A'
            };
        }
    }
    
    recordAttendance(attendee);
}

function recordAttendance(attendee) {
    const record = {
        event: CONFIG.eventName,
        name: attendee.name,
        email: attendee.email,
        time: new Date().toLocaleString('en-SG'),
        timestamp: new Date().toISOString()
    };
    
    attendanceLog.unshift(record);
    
    if (attendanceLog.length > 100) {
        attendanceLog = attendanceLog.slice(0, 100);
    }
    
    saveData();
    showResult(record);
    updateDisplay();
    
    if (!CONFIG.testMode) {
        sendToGoogleSheets(record);
    } else {
        console.log('Test mode - would send:', record);
    }
}

function showResult(record) {
    const resultDiv = document.getElementById('result');
    document.getElementById('resultName').textContent = record.name;
    document.getElementById('resultEmail').textContent = record.email;
    document.getElementById('resultTime').textContent = record.time;
    
    resultDiv.style.display = 'block';
    
    setTimeout(() => {
        resultDiv.style.display = 'none';
    }, 5000);
}

function updateDisplay() {
    document.getElementById('totalCount').textContent = attendanceLog.length;
    
    const logContainer = document.getElementById('logContainer');
    
    if (attendanceLog.length === 0) {
        logContainer.innerHTML = '<p style="text-align:center; color:#999; padding:20px;">No scans yet</p>';
        return;
    }
    
    let html = '';
    attendanceLog.slice(0, 20).forEach(record => {
        html += `
            <div class="log-entry">
                <p><strong>\${record.name}</strong></p>
                <p>Email: \${record.email}</p>
                <p>Time: \${record.time}</p>
            </div>
        `;
    });
    
    logContainer.innerHTML = html;
}

function saveData() {
    localStorage.setItem('attendance', JSON.stringify(attendanceLog));
}

function loadSavedData() {
    const saved = localStorage.getItem('attendance');
    if (saved) {
        try {
            attendanceLog = JSON.parse(saved);
            console.log('Loaded', attendanceLog.length, 'records');
        } catch(e) {
            console.error('Error loading data:', e);
            attendanceLog = [];
        }
    }
}

async function sendToGoogleSheets(record) {
    try {
        const data = {
            sheetTab: CONFIG.sheetTabs.attendance,
            eventName: record.event,
            attendeeName: record.name,
            attendeeEmail: record.email,
            timestamp: record.timestamp,
            displayTime: record.time,
            status: 'Checked In'
        };
        
        await fetch(CONFIG.googleSheetsURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        console.log('Sent to Google Sheets:', data);
    } catch(error) {
        console.error('Error sending to Google Sheets:', error);
    }
}

function exportCSV() {
    if (attendanceLog.length === 0) {
        alert('No data to export');
        return;
    }
    
    let csv = 'Event,Name,Email,Timestamp
';
    attendanceLog.forEach(record => {
        csv += `"\${record.event}","\${record.name}","\${record.email}","\${record.time}"
`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Annual_Gathering_2026_Attendance.csv';
    a.click();
    
    console.log('Exported', attendanceLog.length, 'records');
}

function clearAll() {
    if (confirm('Clear all attendance records? This cannot be undone.')) {
        attendanceLog = [];
        localStorage.removeItem('attendance');
        updateDisplay();
        console.log('All data cleared');
    }
}

console.log('Scanner.js loaded successfully');
