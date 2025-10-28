import React, { useState } from 'react';

function SearchBar({ onSearch, searchType, setSearchType, loading }) {
  const [query, setQuery] = useState('');
  const types = ['title', 'author', 'subject', 'isbn'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 sm:p-6 md:p-8 flex flex-col items-center space-y-5 transition-all duration-500"
      >
        <label className="block text-gray-800 dark:text-gray-200 font-semibold text-base sm:text-lg mb-1">
          Search By:
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full">
          {types.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSearchType(type)}
              className={`py-2 sm:py-3 px-3 sm:px-5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                searchType === type
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search by ${searchType}...`}
            className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black 
                       placeholder-gray-500 bg-white dark:bg-gray-100 text-sm sm:text-base w-full"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 
                       disabled:bg-gray-400 disabled:cursor-not-allowed transition-all text-sm sm:text-base w-full sm:w-auto"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
