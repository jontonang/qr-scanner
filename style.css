/* ===================================
   Reset and Base Styles
   =================================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
    line-height: 1.6;
}

.container {
    max-width: 900px;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

/* ===================================
   Header
   =================================== */
header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

header h1 {
    color: #333;
    font-size: 2.5em;
    margin-bottom: 10px;
    font-weight: 700;
}

header p {
    color: #666;
    font-size: 1.1em;
}

/* ===================================
   Event Display (Fixed Event)
   =================================== */
.event-display {
    text-align: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.event-display h2 {
    color: white;
    font-size: 2.2em;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.event-subtitle {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.2em;
    margin: 0;
    font-weight: 300;
}

/* ===================================
   Scanner Input Section
   =================================== */
.scanner-input-section {
    background: #f8f9fa;
    padding: 30px;
    border-radius: 12px;
    margin: 20px 0;
    text-align: center;
}

.scanner-input-section h2 {
    color: #333;
    margin-bottom: 10px;
    font-size: 1.8em;
}

.instruction {
    color: #666;
    font-size: 16px;
    margin-bottom: 20px;
}

.input-container {
    position: relative;
    max-width: 600px;
    margin: 0 auto 20px;
}

#qrInput {
    width: 100%;
    padding: 20px;
    font-size: 20px;
    border: 3px solid #667eea;
    border-radius: 10px;
    text-align: center;
    font-weight: bold;
    background: white;
    transition: all 0.3s;
    font-family: 'Courier New', monospace;
}

#qrInput:focus {
    outline: none;
    border-color: #5568d3;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
    transform: scale(1.02);
}

.scan-indicator {
    margin-top: 15px;
    padding: 12px;
    background: #d4edda;
    border-radius: 8px;
    color: #155724;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 16px;
}

.pulse {
    width: 12px;
    height: 12px;
    background: #28a745;
    border-radius: 50%;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.5;
        transform: scale(1.3);
    }
}

.scan-indicator.scanning {
    background: #fff3cd;
    color: #856404;
}

.scan-indicator.scanning .pulse {
    background: #ffc107;
}

.scan-indicator.success {
    background: #d4edda;
    color: #155724;
}

.scan-indicator.success .pulse {
    background: #28a745;
}

.scan-indicator.error {
    background: #f8d7da;
    color: #721c24;
}

.scan-indicator.error .pulse {
    background: #dc3545;
}

/* ===================================
   Buttons
   =================================== */
.quick-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
    flex-wrap: wrap;
}

.btn-primary, .btn-secondary, .btn-export, .btn-danger {
    padding: 12px 30px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.btn-primary {
    background: #667eea;
    color: white;
}

.btn-primary:hover {
    background: #5568d3;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
    background: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background: #5a6268;
    transform: translateY(-2px);
}

.btn-export {
    background: #28a745;
    color: white;
}

.btn-export:hover {
    background: #218838;
    transform: translateY(-2px);
}

.btn-danger {
    background: #dc3545;
    color: white;
}

.btn-danger:hover {
    background: #c82333;
    transform: translateY(-2px);
}

/* ===================================
   Result Container
   =================================== */
#result-container {
    margin: 30px 0;
    animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.success-message {
    background: #d4edda;
    border: 2px solid #28a745;
    border-radius: 12px;
    padding: 25px;
    text-align: center;
}

.success-message h2 {
    color: #155724;
    margin-bottom: 20px;
    font-size: 1.8em;
}

.attendee-info {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: left;
    max-width: 500px;
    margin: 0 auto;
}

.attendee-info p {
    margin: 12px 0;
    font-size: 16px;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.attendee-info strong {
    color: #667eea;
    min-width: 100px;
}

.attendee-info span {
    flex: 1;
    text-align: right;
    font-weight: 600;
}

/* ===================================
   Status Messages
   =================================== */
#status-message {
    margin: 20px 0;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
    display: none;
    animation: fadeIn 0.3s;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

#status-message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    display: block;
}

#status-message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    display: block;
}

#status-message.warning {
    background: #fff3cd;
    color: #856404;
    border: 1px solid #ffeaa7;
    display: block;
}

/* ===================================
   Statistics
   =================================== */
.statistics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin: 30px 0;
}

.stat-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 25px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    transition: transform 0.3s;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.stat-number {
    font-size: 3em;
    font-weight: bold;
    margin-bottom: 10px;
}

.stat-label {
    font-size: 1em;
    opacity: 0.9;
}

/* ===================================
   Attendance Log
   =================================== */
.attendance-log {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 2px solid #f0f0f0;
}

.log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
}

.log-header h3 {
    color: #333;
    font-size: 1.8em;
}

.log-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

#log-container {
    max-height: 500px;
    overflow-y: auto;
    padding-right: 10px;
}

/* Custom Scrollbar */
#log-container::-webkit-scrollbar {
    width: 8px;
}

#log-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

#log-container::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
}

#log-container::-webkit-scrollbar-thumb:hover {
    background: #5568d3;
}

.log-entry {
    background: #f8f9fa;
    padding: 18px;
    margin-bottom: 12px;
    border-radius: 8px;
    border-left: 4px solid #667eea;
    transition: all 0.3s;
    animation: slideInLog 0.3s ease-out;
}

@keyframes slideInLog {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.log-entry:hover {
    background: #e9ecef;
    transform: translateX(5px);
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.log-entry p {
    margin: 6px 0;
    color: #555;
    font-size: 15px;
}

.log-entry strong {
    color: #333;
    font-weight: 600;
}

.no-data {
    text-align: center;
    color: #999;
    padding: 40px 20px;
    font-style: italic;
    font-size: 16px;
}

/* ===================================
   Footer
   =================================== */
footer {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 2px solid #f0f0f0;
    text-align: center;
    color: #666;
}

footer p {
    margin: 5px 0;
    font-size: 14px;
}

.version {
    font-size: 12px;
    color: #999;
}

/* ===================================
   Responsive Design
   =================================== */
@media (max-width: 768px) {
    .container {
        padding: 20px;
    }
    
    header h1 {
        font-size: 2em;
    }
    
    .event-display h2 {
        font-size: 1.8em;
    }
    
    .scanner-input-section h2 {
        font-size: 1.5em;
    }
    
    #qrInput {
        font-size: 18px;
        padding: 15px;
    }
    
    .btn-primary, .btn-secondary, .btn-export, .btn-danger {
        padding: 10px 20px;
        font-size: 14px;
    }
    
    .statistics {
        grid-template-columns: 1fr;
    }
    
    .stat-number {
        font-size: 2.5em;
    }
    
    .log-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .log-actions {
        width: 100%;
    }
    
    .log-actions button {
        flex: 1;
    }
}

@media (max-width: 480px) {
    body {
        padding: 10px;
    }
    
    .container {
        padding: 15px;
        border-radius: 15px;
    }
    
    header h1 {
        font-size: 1.6em;
    }
    
    .event-display {
        padding: 20px;
    }
    
    .event-display h2 {
        font-size: 1.5em;
    }
    
    .scanner-input-section {
        padding: 20px;
    }
    
    .attendee-info p {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .attendee-info span {
        text-align: left;
        margin-top: 5px;
    }
}

/* ===================================
   Print Styles
   =================================== */
@media print {
    body {
        background: white;
        padding: 0;
    }
    
    .container {
        box-shadow: none;
        max-width: 100%;
    }
    
    .scanner-input-section,
    .quick-actions,
    .log-actions,
    footer {
        display: none;
    }
    
    .event-display {
        background: white;
        color: black;
        border: 2px solid #333;
    }
    
    .event-display h2 {
        color: black;
        text-shadow: none;
    }
}
