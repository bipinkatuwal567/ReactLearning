import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchOrder() {
  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`order/${query}`);
    setQuery('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search order #"
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 sm:w-64 sm:focus:w-72 focus:ring-opacity-50"
      />
    </form>
  );
}
