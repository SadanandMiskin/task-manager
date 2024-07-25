import React, { useState } from 'react';
import '../../App.css';

const EditTodoModal = ({ todo, onSave, onClose }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSave = () => {
    onSave(todo._id, { title, description });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Todo</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditTodoModal;
