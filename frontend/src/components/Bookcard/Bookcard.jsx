import React from "react";

const Bookcard = ({ book }) => {
  const info = book.volumeInfo || {};
  return (
    <div className="book-card">
      <img
        className="book-card-cover"
        src={
          info.imageLinks?.thumbnail ||
          "https://via.placeholder.com/128x193?text=No+Cover"
        }
        alt={info.title}
      />
      <div className="book-card-details">
        <h3 className="book-card-title">{info.title}</h3>
        <p className="book-card-author">
          {info.authors ? info.authors.join(", ") : "Unknown Author"}
        </p>
        <p className="book-card-year">{info.publishedDate || ""}</p>
      </div>
    </div>
  );
};

export default Bookcard;
