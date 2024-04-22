import React, { useState, useEffect } from 'react';
import Note from './note_content'; // Import the Note component
import {
  addNote, getAllNotes, deleteNote, editNote,
} from '../services/datastore'; // Import the addNote function

function App(props) {
  const [notes, setNotes] = useState({});
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [noteColor, setNoteColor] = useState('#bcecdc'); // Default color

  // Use useEffect to fetch the note when the component mounts
  useEffect(() => {
    getAllNotes((notesData) => {
      setNotes(notesData || {});
    });
  }, []); // Run only once on component mount

  const handleTitleChange = (e) => {
    setNewNoteTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setNewNoteContent(e.target.value);
  };

  const handleColorChange = (e) => {
    setNoteColor(e.target.value);
  };

  const handleAddNote = () => {
    if (newNoteTitle.trim() !== '' && newNoteContent.trim() !== '') {
      // Get the default position of the note
      const defaultPosition = { x: 0, y: 0 };
      // Add note using Firebase function and pass default position
      addNote(newNoteTitle, newNoteContent, noteColor, defaultPosition.x, defaultPosition.y);
      setNewNoteTitle(''); // Clear the input field after adding a new note
      setNewNoteContent(''); // Clear the input field after adding a new note
    } else {
      // eslint-disable-next-line no-alert
      alert('Please enter both title and content for the new note.');
    }
  };

  const handleDeleteNote = (id) => {
    // Call deleteNote function to delete the note from the database
    deleteNote(id);
  };

  const handleEditNote = (noteId, editedTitle, editedContent, editedColor, notePosition) => {
    // Ensure that editedTitle and editedContent are not empty
    if (editedTitle.trim() !== '' && editedContent.trim() !== '') {
      // Construct updatedNote object
      const updatedNote = {
        title: editedTitle,
        content: editedContent,
        color: editedColor,
        position: notePosition,
        // You might need to include other properties like color and position if they can be edited
      };
      // Call editNote function to edit the note in the database
      editNote(noteId, updatedNote);
    } else {
      console.error('Please enter both title and content for the note.');
    }
  };
  return (
    <div>
      <div className="addNote">
        <input
          type="text"
          placeholder="Enter title"
          value={newNoteTitle}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Enter content"
          value={newNoteContent}
          onChange={handleContentChange}
        />
        <input
          type="color"
          value={noteColor}
          onChange={handleColorChange}
        />
        <button type="button" onClick={handleAddNote}>Add Note</button>
      </div>
      {Object.keys(notes).map((noteId, index) => (
        <Note
          key={noteId}
          id={noteId}
          title={notes[noteId].title}
          content={notes[noteId].content}
          color={notes[noteId].color}
          onDelete={() => handleDeleteNote(noteId)}
          position={notes[noteId].position} // Pass the position of the note
          onEdit={(editedTitle, editedContent, editedColor, notePosition) => handleEditNote(noteId, editedTitle, editedContent, editedColor, notePosition)}
        />
      ))}

    </div>
  );
}

export default App;
