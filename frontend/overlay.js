// DOM Elements
const overlay = document.getElementById('nameOverlay');
const submitButton = document.getElementById('submitName');
const anonymousButton = document.getElementById('anonymousButton');
const userNameInput = document.getElementById('userName');
const userNameDisplay = document.getElementById('username');

// Fetches the last saved username from the backend or localStorage
async function fetchLastUsername() {
  const savedUsername = localStorage.getItem('lastUsername') || "Anonymous";

  try {
    const response = await fetch('/logs');
    if (response.ok) {
      const logs = await response.json();
      const lastLog = logs.reverse().find(log => log.message.includes('User logged in as:'));
      if (lastLog) {
        return lastLog.message.split(': ')[1];
      }
    }
  } catch (error) {
    console.error('Failed to fetch username from backend:', error);
  }
  return savedUsername;
}

// Save username to the backend and localStorage
async function saveUsernameToServer(username) {
  const logMessage = `User logged in as: ${username}`;
  localStorage.setItem('lastUsername', username); // Save to localStorage
  try {
    await fetch('/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: logMessage }),
    });
  } catch (error) {
    console.error('Failed to save username to backend:', error);
  }
}

// Update Username in Noteboard
function updateNoteboardUsername(name) {
  if (typeof setUsername === 'function') {
    setUsername(name || "Anonymous");
  }
}

// Hides Overlay and Save Username
function removeOverlay(name) {
  const userName = name || "Anonymous";
  userNameDisplay.textContent = userName;
  overlay.style.display = 'none';
  updateNoteboardUsername(userName);
  saveUsernameToServer(userName);
}

// Event Listener: Submit Custom Name
submitButton.addEventListener('click', () => {
  const name = userNameInput.value.trim();
  if (name) {
    removeOverlay(name);
  } else {
    alert('Please enter a valid name or use Anonymous.');
  }
});


// Event Listener: Submit Custom Name
submitButton.addEventListener('click', () => {
  const name = userNameInput.value.trim();
  if (name) {
    removeOverlay(name);
  } else {
    alert('Please enter a valid name or use Anonymous.');
  }
});

// Event Listener and the Anonymous Button
anonymousButton.addEventListener('click', () => {
  removeOverlay("Anonymous");
});

// Loads the last username on page load
document.addEventListener('DOMContentLoaded', async () => {
  const lastUsername = await fetchLastUsername();
  userNameDisplay.textContent = lastUsername;
  updateNoteboardUsername(lastUsername);
});
