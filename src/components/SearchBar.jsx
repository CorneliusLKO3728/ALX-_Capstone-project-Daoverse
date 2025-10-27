

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for scriptures by title, author, or keywords..."
          className="w-full bg-white rounded-full px-6 py-4 text-gray-500 text-lg md:text-xl shadow-2xl hover:shadow-purple-500/30 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-700 transition"
        >
          <span className="text-2xl">🔍</span>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;