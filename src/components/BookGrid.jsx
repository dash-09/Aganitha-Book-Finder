import React from 'react';
import BookCard from './BookCard';

function BookGrid({ books, onSaveBook, savedBooks = [] }) {
  if (!books.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {books.map((book, index) => (
        <BookCard
          key={book.key || index}
          book={book}
          onSaveBook={onSaveBook}
          savedBooks={savedBooks} // ✅ always passed safely
        />
      ))}
    </div>
  );
}

export default BookGrid;
