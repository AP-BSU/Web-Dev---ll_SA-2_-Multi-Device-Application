// toggles the Light/Dark mode for the website and updates the button text dynamically.

// Find the toggle button by its ID
const modeButton = document.getElementById('toggleMode');

// Add an event listener to the button for 'click' events
modeButton.addEventListener('click', function () {
  const body = document.body; // Target the body element

  // Toggle dark mode class on the body element
  const isDarkMode = body.classList.toggle('dark-mode');

  // Update the button text based on the current mode
  if (isDarkMode) {
    modeButton.textContent = 'Light Mode'; // Show Light Mode text when in Dark Mode
  } else {
    modeButton.textContent = 'Dark Mode'; // Show Dark Mode text when in Light Mode
  }
});
