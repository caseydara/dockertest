import React, { useEffect, useState } from 'react';
import Note from './note_content'; // Import the Note component

function App(props) {
  const [notes, setNotes] = useState({});
  const [currentId, setCurrentId] = useState(1); // Initialize currentId to 1
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [noteColor, setNoteColor] = useState('#bcecdc'); // Default color

  useEffect(() => {
    // Create a new note object with a unique ID whenever currentId changes
    setNotes((prevNotes) => ({
      ...prevNotes,
    }));
  }, [currentId]); // useEffect will re-run whenever currentId changes

  const handleChangeId = () => {
    setCurrentId((prevId) => prevId + 1); // Increment previous ID by 1
  };

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
      setNotes((prevNotes) => ({
        ...prevNotes,
        [`id${currentId}`]: {
          title: newNoteTitle,
          text: newNoteContent,
          color: noteColor, // Add color to the note object
          x: 400,
          y: 12,
          zIndex: 26,
        },
      }));
      handleChangeId(); // Increment the ID after adding a new note
      setNewNoteTitle(''); // Clear the input field after adding a new note
      setNewNoteContent(''); // Clear the input field after adding a new note
    } else {
      // eslint-disable-next-line no-alert
      alert('Please enter both title and content for the new note.');
    }
  };

  const handleDeleteNote = (id) => {
    // Function to delete a note by its ID
    const updatedNotes = { ...notes };
    delete updatedNotes[id];
    setNotes(updatedNotes);
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
      {Object.keys(notes).map((noteId) => (
        <Note
          key={noteId}
          id={noteId} // Pass the note's ID as a prop
          title={notes[noteId].title}
          content={notes[noteId].text}
          color={notes[noteId].color} // Pass the note's color as a prop
          onDelete={() => handleDeleteNote(noteId)} // Pass a function to handle note deletion
        />
      ))}
    </div>
  );
}

export default App;
