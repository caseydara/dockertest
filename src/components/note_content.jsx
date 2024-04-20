import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CiEdit } from 'react-icons/ci';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MdDeleteOutline } from 'react-icons/md';

// eslint-disable-next-line react/prop-types
function Note({
  // eslint-disable-next-line react/prop-types
  title, content, color, onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
    setEditedTitle(title);
    setEditedContent(content);
  }, [title, content]);

  const handleDelete = () => {
    onDelete();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleSave = () => {
    setEditedContent(editedContent);
    setEditedTitle(editedTitle);
    setIsEditing(false);
    // You might want to add logic here to save changes to backend or state management system
  };

  return (
    <Draggable
      defaultPosition={{ x: 20, y: 20 }}
      grid={[25, 25]}
      onStart={() => console.log('Drag started')}
      onDrag={() => console.log('Dragging')}
      onStop={() => console.log('Drag stopped')}
    >
      <div
        style={{
          backgroundColor: color,
          borderRadius: 5,
          padding: '10px',
          margin: '10px',
          width: '200px',
          cursor: 'move',
        }}
      >
        {isEditing ? (
          <div>
            <input type="text" value={editedTitle} onChange={handleTitleChange} />
            <textarea value={editedContent} onChange={handleContentChange} />
            <button type="button" onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <h3 style={{ wordWrap: 'break-word' }}>{editedTitle}</h3>
            <p style={{ wordWrap: 'break-word' }}>{editedContent}</p>
            <button type="button" onClick={handleEdit} aria-label="Edit note"><CiEdit /></button>
            <button type="button" onClick={handleDelete} aria-label="Delete note"><MdDeleteOutline /></button>
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default Note;
