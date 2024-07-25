import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import Search from '../Search';
import LoadingSpinner from '../LoadingSpinner';
import '../../App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/todos');
      const { todos, user } = response.data;
      setTodos(todos);
      setUsername(user.firstName); 
      setLoading(false);
      // console.log(response.data.user.firstName)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      window.location.href = '/login'
      setLoading(false);
    }
  };

  const addTodo = async (title ,description) => {
    try {
      const response = await api.post('/todos', { title  , description});
      setTodos([response.data, ...todos]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const response = await api.put(`/todos/${id}`, updates);
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const searchTodos = async (query, sort) => {
    try {
      const response = await api.get(`/todos/search?query=${query}&sort=${sort}`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error searching todos:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <center>
        <h2>Hello, {username}</h2>
      <h4>Todo App</h4>
      </center>
      {user ? (
        
        <>
        {/* <p>{user}</p> */}
          <TodoForm addTodo={addTodo} />
          <Search searchTodos={searchTodos} />
          <div className="columntodo">
          <div className="todo-columns">
            {todos.length == 0 ? <div className="inc"> <p>No Todos, Please Add</p></div> : ['TODO', 'IN PROGRESS', 'DONE'].map((status) => (
              <div key={status} className="todo-column">
                <h2 className='option'>{status}</h2>
                
                  {todos
                  .filter((todo) => todo.status === status)
                  .map((todo) => (
                    <TodoItem
                      key={todo._id}
                      todo={todo}
                      updateTodo={updateTodo}
                      deleteTodo={deleteTodo}
                    />
                  ))}
              </div>
            )) }
            
          </div>
          </div>
        </>
      ) : (
        <center>
          <h1>Please log in to view your todo list.</h1>
        </center>
      )}
    </div>
  );
};

export default TodoList;
