// Select DOM Elements
const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNoteButton');
const submittedNotesContainer = document.getElementById('submittedNotesContainer');
let savedUsername = "Anonymous"; // Default username

// Setting of username
function setUsername(name) {
  savedUsername = name || "Anonymous";
  console.log("Username set to:", savedUsername); // Debugging
}

// Fetch Notes from Backend or localStorage
async function fetchNotes() {
  const savedNotes = JSON.parse(localStorage.getItem('notesBackup')) || [];
  savedNotes.forEach(note => {
    const noteBox = createNoteBox(note.content, note.username);
    submittedNotesContainer.appendChild(noteBox);
  });

  try {
    const response = await fetch('/notes');
    if (response.ok) {
      const notes = await response.json();
      submittedNotesContainer.innerHTML = ''; // Clear UI to prevent duplication
      notes.forEach(note => {
        const noteBox = createNoteBox(note.content, note.username);
        submittedNotesContainer.appendChild(noteBox);
      });
      localStorage.setItem('notesBackup', JSON.stringify(notes)); // Update localStorage
    }
  } catch (error) {
    console.error('Error fetching notes from backend:', error);
  }
}

// Save Note to Backend and localStorage
async function saveNoteToServer(note) {
  const notesBackup = JSON.parse(localStorage.getItem('notesBackup')) || [];
  notesBackup.push(note);
  localStorage.setItem('notesBackup', JSON.stringify(notesBackup)); // Save to localStorage

  try {
    await fetch('/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
  } catch (error) {
    console.error('Error saving note to backend:', error);
  }
}

// Function: Create a Note Box
function createNoteBox(noteText, username) {
  const noteBox = document.createElement('div');
  noteBox.className = 'note-box';

  const noteParagraph = document.createElement('p');
  noteParagraph.textContent = `${noteText}\n- ${username}`;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-note-button';
  deleteButton.textContent = 'X';

  noteBox.appendChild(deleteButton);
  noteBox.appendChild(noteParagraph);

  deleteButton.addEventListener('click', () => {
    // Log the deletion of the note
    if (typeof addLog === 'function') {
      addLog(`Note deleted by ${username}: "${noteText}"`);
    }
    submittedNotesContainer.removeChild(noteBox);
    saveNotes();
  });

  return noteBox;
}

// Add of New Note
function addNote() {
  const noteText = noteInput.value.trim();

  if (!noteText) {
    alert('Please enter a valid note.');
    return;
  }
  if (noteText.length > 416) {
    alert('Note exceeds the maximum character limit of 416.');
    return;
  }
  const note = { content: noteText, username: savedUsername };
  const noteBox = createNoteBox(noteText, savedUsername);
  submittedNotesContainer.appendChild(noteBox);
  saveNoteToServer(note);

  // Log the addition of the note
  if (typeof addLog === 'function') {
    addLog(`Note added by ${savedUsername}: "${noteText}"`);
  }
}

// Attach event listeners
addNoteButton.addEventListener('click', addNote);
document.addEventListener('DOMContentLoaded', fetchNotes);
