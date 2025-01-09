// DOM Elements (Note: aided with AI)
const logContainer = document.getElementById('logContainer');

// Function: Fetch Logs from Backend or offline localStorage
async function loadLogsFromServer() {
  const savedLogs = JSON.parse(localStorage.getItem('logsBackup')) || [];
  savedLogs.forEach(log => createLogItem(log));

  try {
    const response = await fetch('/logs');
    if (response.ok) {
      const logs = await response.json();
      logContainer.innerHTML = ''; // Clear UI to prevent duplication
      logs.forEach(log => {
        createLogItem(`${log.timestamp}: ${log.message}`);
      });
      localStorage.setItem('logsBackup', JSON.stringify(logs.map(log => `${log.timestamp}: ${log.message}`))); // Update localStorage
    }
  } catch (error) {
    console.error('Error fetching logs from backend:', error);
  }
}

// To save Log to Backend and localStorage
async function saveLogToServer(message) {
  const log = { message, timestamp: new Date() };
  const logsBackup = JSON.parse(localStorage.getItem('logsBackup')) || [];
  logsBackup.push(`${log.timestamp}: ${log.message}`);
  localStorage.setItem('logsBackup', JSON.stringify(logsBackup)); // Save to localStorage

  try {
    await fetch('/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log),
    });
  } catch (error) {
    console.error('Error saving log to backend:', error);
  }
}

// Create Log Item in UI
function createLogItem(log) {
  const logItem = document.createElement('div');
  logItem.className = 'log-item';
  logItem.textContent = log;
  logContainer.appendChild(logItem);
}

// Adding of Log
function addLog(message) {
  const logMessage = `${new Date().toLocaleString()}: ${message}`;
  createLogItem(logMessage); // Add to UI
  saveLogToServer(message); // Save to backend and localStorage
}

// Predefined Logs for `sa-board` NOTE: Update index.html
function logSaBoardActions() {
  addLog('SA-Board Task: Minerva - Game Development Summative Assessment 2 in progress.');
  addLog('SA-Board Task: Minerva - Website Development Summative Assessment 2 in progress.');
  addLog('SA-Board Task: Minerva - CodeLab 2 Summative Assessment 2 in progress.');
}

// Load Logs and Log Predefined Actions on Page Load
document.addEventListener('DOMContentLoaded', () => {
  loadLogsFromServer();
  logSaBoardActions(); // Log predefined SA-Board tasks
});
