import React from 'react';
import '../../App.css';

const ViewDetail = ({ todo, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Details</h2>
        <label>
          Title:
          <h3>{todo.title}</h3>
        </label>
        <label>
          Description:
          <p>{todo.description}</p>
        </label>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ViewDetail;
