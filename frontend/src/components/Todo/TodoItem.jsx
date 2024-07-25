import React, { useState } from 'react';
import EditTodoModal from './EditTodoModal';
import ViewDetail from './ViewDetail';
import '../../App.css';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);

  const handleStatusChange = (e) => {
    updateTodo(todo._id, { status: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (id, updatedFields) => {
    updateTodo(id, updatedFields);
  };

  const handleDetail = () => {
    setViewDetail(true);
  };

  return (
    
    <div className="todo-item">
      <h3>{todo.title}</h3>
      <h6>{todo.description}</h6>
      <p>Created: {new Date(todo.createdAt).toLocaleString()}</p>
      <div className='card-sel'>
        <select value={todo.status} onChange={handleStatusChange}>
          <option value="TODO">TODO</option>
          <option value="IN PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <button onClick={handleEdit}>Edit</button>
        <button className='btn' onClick={() => deleteTodo(todo._id)}>Delete</button>
        <button onClick={handleDetail}>View Details</button>
      </div>
      {viewDetail && (
        <ViewDetail
          todo={todo}
          onClose={() => setViewDetail(false)}
        />
      )}
      {isEditing && (
        <EditTodoModal
          todo={todo}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default TodoItem;
