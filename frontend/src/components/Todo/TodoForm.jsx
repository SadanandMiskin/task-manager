import React, { useState } from 'react';
import '../../App.css';

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title, description);
      setTitle('');
      setDescription('')
    }
  };

  return (
   <div className='form-todo'>
     <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Add a new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
       <textarea
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
   </div>
  );
};

export default TodoForm;
