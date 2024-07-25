import React, { useState } from 'react';
import '../App.css';

const Search = ({ searchTodos }) => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recent');

  const handleSubmit = (e) => {
    e.preventDefault();
    searchTodos(query, sort);
  };

  return (
    
   <div className="search">
  
     <form onSubmit={handleSubmit} className="search-form">
      <label>Search:</label>
      <input
        type="text"
        placeholder="Search todos"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="recent">Recent</option>
        <option value="old">Old</option>
      </select>
      <button type="submit">Search</button>
    </form>
   </div>
  );
};

export default Search;
