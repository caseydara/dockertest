import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CiEdit } from 'react-icons/ci';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MdDeleteOutline } from 'react-icons/md';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactMarkdown from 'react-markdown';

// eslint-disable-next-line react/prop-types
function Note({
  // eslint-disable-next-line react/prop-types
  title, content, color, onDelete, onEdit, position,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [notePosition, setNotePosition] = useState(position);
  const editedColor = color; // New state for edited color

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
    // Call onEdit function with updated title and content
    onEdit(editedTitle, editedContent, editedColor, notePosition);
    setIsEditing(false);
  };
  const handleDragStop = (e, data) => {
    const { x, y } = data;
    setNotePosition({ x, y });
    onEdit(editedTitle, editedContent, editedColor, { x: data.x, y: data.y });
  };

  return (
    <Draggable
      defaultPosition={notePosition}
      onStop={handleDragStop}
      onStart={() => console.log('Drag started')}
      onDrag={() => console.log('Dragging')}
      // eslint-disable-next-line react/jsx-no-duplicate-props
    >
      <div
        style={{
          backgroundColor: editedColor,
          borderRadius: 5,
          padding: '10px',
          margin: '10px',
          width: '200px',
          cursor: 'move',
          alignItems: 'flex-start',
          alignContent: 'center',
          overflow: 'hidden',
          position: 'absolute',
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
            <ReactMarkdown>{editedContent}</ReactMarkdown>
            <button type="button" onClick={handleEdit} aria-label="Edit note"><CiEdit /></button>
            <button type="button" onClick={handleDelete} aria-label="Delete note"><MdDeleteOutline /></button>
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default Note;
