// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  set,
} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDn0An_32Xoepdg87t4kbNgYW6erVYh8EY',
  authDomain: 'notes-f6ff2.firebaseapp.com',
  databaseURL: 'https://notes-f6ff2-default-rtdb.firebaseio.com',
  projectId: 'notes-f6ff2',
  storageBucket: 'notes-f6ff2.appspot.com',
  messagingSenderId: '758264072748',
  appId: '1:758264072748:web:1bebb82a0f9b9eed399f89',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to add a new note to the database
// eslint-disable-next-line import/prefer-default-export
export function addNote(title, content, color, x, y) {
  push(ref(database, 'notes'), {
    title,
    content,
    color,
    position: { x, y }, // Add position object with x and y values
  });
}

// Function to edit a note in the database
export function editNote(noteId, updatedNote) {
  console.log('Editing note:', noteId);
  console.log('Updated note:', updatedNote);
  set(ref(database, `notes/${noteId}`), updatedNote);
}

// Function to delete a note from the database
export function deleteNote(noteId) {
  // eslint-disable-next-line no-undef
  remove(ref(database, `notes/${noteId}`));
}

// Function to fetch all notes from the database
export function getAllNotes(callback) {
  onValue(ref(database, 'notes'), (snapshot) => {
    const notesData = snapshot.val();
    callback(notesData);
  });
}
// Function to get the color of a specific note from the database
export function getNoteColor(noteId, callback) {
  // Get the reference to the specific note in the database
  const noteRef = ref(database, `notes/${noteId}/color`);

  // Listen for changes in the color of the note
  onValue(noteRef, (snapshot) => {
    const color = snapshot.val(); // Get the color value from the snapshot
    callback(color); // Invoke the callback function with the color value
  });
}
