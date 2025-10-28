import React, { useEffect, useState } from 'react';

function BookCard({ book, onSaveBook, savedBooks = [] }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = Array.isArray(savedBooks)
      ? savedBooks.some((b) => b.key === book.key)
      : false;
    setIsSaved(saved);
  }, [book.key, savedBooks]);

  const handleToggle = () => {
    onSaveBook(book);
    setIsSaved(!isSaved);
  };

  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : 'https://via.placeholder.com/300x450?text=No+Cover';

  const description =
    book.first_sentence?.join(' ') ||
    book.subtitle ||
    (book.subject ? book.subject.slice(0, 3).join(', ') : 'No description available.');

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-transform transform hover:-translate-y-2">
      {/* Bookmark Button */}
      <button
        onClick={handleToggle}
        className="absolute top-3 right-3 bg-white/90 dark:bg-gray-700 rounded-full p-2 shadow-md hover:scale-110 transition-all"
        title={isSaved ? 'Remove from Saved' : 'Save Book'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-all duration-300 ${
            isSaved ? 'text-yellow-400 fill-yellow-400' : 'text-indigo-600 dark:text-indigo-400'
          }`}
          viewBox="0 0 24 24"
          fill={isSaved ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 2a1 1 0 0 0-1 1v18l7-4 7 4V3a1 1 0 0 0-1-1H6z"
          />
        </svg>
      </button>

      <img src={cover} alt={book.title} className="w-full h-80 object-cover" />

      <div className="p-5 text-left">
        <h3 className="font-semibold text-lg text-indigo-900 dark:text-indigo-200 mb-1 line-clamp-1">
          {book.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 italic text-sm mb-2">
          {book.author_name ? book.author_name.slice(0, 2).join(', ') : 'Unknown Author'}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  );
}

export default BookCard;
