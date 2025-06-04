import React from "react";
import "./Bookcard.css";

const Bookcard = ({ book }) => {
  const info = book.volumeInfo || {};
  return (
    <div className="book-card">
      <div className="book-card-media">
        <div className="movie-card-media">
          <img
            className="book-card-poster"
            src={
              info.imageLinks?.thumbnail ||
              "https://via.placeholder.com/128x193?text=No+Cover"
            }
            alt={info.title}
          />
        </div>
      </div>
      <div className="book-card-content">
        <div className="book-card-details">
          <h2 className="book-card-title">{info.title}</h2>
          <h3 className="book-card-author">
            {info.authors ? info.authors.join(", ") : "Unknown Author"}
          </h3>
          <p className="book-card-meta">
            <span className="book-card-year">{info.publishedDate || ""}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bookcard;
