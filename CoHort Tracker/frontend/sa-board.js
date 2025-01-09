// summative assessments section (NOTE: Aided with AI)
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.header-checkbox');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const headerItem = event.target.closest('.header-item');
      const link = headerItem.querySelector('.header-link');

      if (checkbox.checked) {
        // Apply strikethrough and green background
        headerItem.classList.add('checked');
        link.style.textDecoration = 'line-through';
      } else {
        // Remove strikethrough and reset background
        headerItem.classList.remove('checked');
        link.style.textDecoration = 'none';
      }
    });
  });

  // Detects and adjust for dark mode
  function applyDarkModeStyles() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    checkboxes.forEach((checkbox) => {
      checkbox.style.accentColor = isDarkMode ? '#86c5f2' : ''; // Sync checkbox color with theme
    });
  }

  // Initial dark mode check
  applyDarkModeStyles();

  // Adjust styles dynamically when dark mode toggles
  const modeToggle = document.getElementById('toggleMode');
  if (modeToggle) {
    modeToggle.addEventListener('click', applyDarkModeStyles);
  }
});

// Function to add new headers dynamically
function addNewHeader(text) {
  const container = document.querySelector('.header-container');

  // Create the header item container
  const headerItem = document.createElement('div');
  headerItem.className = 'header-item';

  // Create the clickable link
  const link = document.createElement('a');
  link.href = 'https://pastebin.com';
  link.textContent = text;
  link.className = 'header-link';
  link.target = '_blank';

  // Create the checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'header-checkbox';

  // Add checkbox functionality
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      headerItem.classList.add('checked');
      link.style.textDecoration = 'line-through';
    } else {
      headerItem.classList.remove('checked');
      link.style.textDecoration = 'none';
    }
  });

  // Append the link and checkbox to the header item
  headerItem.appendChild(link);
  headerItem.appendChild(checkbox);

  // Append the header item to the container
  container.appendChild(headerItem);
}
