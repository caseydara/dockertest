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
      {Object.keys(notes).map((noteId, index) => (
        <Note
          key={noteId}
          id={noteId}
          title={notes[noteId].title}
          content={notes[noteId].text}
          color={notes[noteId].color}
          onDelete={() => handleDeleteNote(noteId)}
        />
      ))}

    </div>
  );
}

export default App;
