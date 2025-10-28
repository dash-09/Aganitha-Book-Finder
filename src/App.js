import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import BookGrid from './components/BookGrid';

function App() {
  const [books, setBooks] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [darkMode, setDarkMode] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  // Load saved books from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedBooks')) || [];
    setSavedBooks(stored);
  }, []);

  // Update localStorage whenever savedBooks changes
  useEffect(() => {
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
  }, [savedBooks]);

  // Hide scrollbar when results or loading
  useEffect(() => {
    if (books.length > 0 || loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [books, loading]);

  // Add / Remove book from saved list
  const handleToggleSave = (book) => {
    setSavedBooks((prev) => {
      const isAlreadySaved = prev.some((b) => b.key === book.key);
      if (isAlreadySaved) {
        return prev.filter((b) => b.key !== book.key); // remove
      } else {
        return [...prev, book]; // add
      }
    });
  };

  // Search Books
  const searchBooks = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');

    try {
      let url = `https://openlibrary.org/search.json?${searchType}=${encodeURIComponent(query)}&limit=30`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.docs?.length) setBooks(data.docs);
      else setError('No books found. Try another search.');
    } catch {
      setError('Network error. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center font-[Poppins] transition-all duration-500 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100'
          : 'bg-gradient-to-br from-indigo-50 to-indigo-100 text-gray-900'
      }`}
    >
      <div
        className={`w-full max-w-6xl rounded-2xl shadow-2xl p-8 sm:p-10 overflow-y-auto max-h-[90vh] transition-all duration-500 ${
          darkMode
            ? 'bg-gray-900/70 backdrop-blur-xl border border-gray-700'
            : 'bg-white/70 backdrop-blur-lg'
        }`}
      >
        {/* Header */}
        <header className="text-center mb-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight">📚 Book Finder</h1>
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
              Find and explore millions of books instantly
            </p>
          </div>

          <div className="flex gap-3">
            {/* Toggle Saved Section */}
            <button
              onClick={() => setShowSaved(!showSaved)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                darkMode
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {showSaved ? '📖 All Books' : '⭐ Saved Books'}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                darkMode
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-800 text-white hover:bg-gray-900'
              }`}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </header>

        {/* Search Bar */}
        {!showSaved && (
          <SearchBar
            onSearch={searchBooks}
            searchType={searchType}
            setSearchType={setSearchType}
            loading={loading}
          />
        )}

        {/* Error Message */}
        {error && (
          <div
            className={`mt-6 px-5 py-3 rounded-lg shadow-sm text-center max-w-2xl mx-auto ${
              darkMode
                ? 'bg-red-900/40 border border-red-700 text-red-300'
                : 'bg-red-50 border border-red-300 text-red-700'
            }`}
          >
            {error}
          </div>
        )}

        {/* Loading or BookGrid */}
        {loading ? (
          <div className="flex justify-center items-center mt-12">
            <div
              className={`h-14 w-14 border-4 rounded-full animate-spin ${
                darkMode
                  ? 'border-gray-600 border-t-transparent'
                  : 'border-indigo-500 border-t-transparent'
              }`}
            ></div>
          </div>
        ) : (
          <BookGrid
            books={showSaved ? savedBooks : books}
            onSaveBook={handleToggleSave}
            savedBooks={savedBooks}
          />
        )}

        {/* Empty Saved Section */}
        {showSaved && savedBooks.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No saved books yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
