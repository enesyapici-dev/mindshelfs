import React from "react";
import "./Bookcard.css";

const Bookcard = ({ book, onClick }) => {
  const info = book.volumeInfo || book;
  const title = info.title || book.title || "";

  let authors = info.authors || book.author || "Unknown Author";
  if (Array.isArray(authors)) authors = authors.join(", ");
  const publishedDate = (info.publishedDate || book.published_date || "").slice(
    0,
    4
  );
  const cover =
    (info.imageLinks && info.imageLinks.thumbnail) || book.cover_image_url;
  const coverSrc =
    cover && cover !== ""
      ? cover
      : "https://placehold.co/128x193?text=No+Cover";

  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-card-media">
        <div className="movie-card-media">
          <img className="book-card-poster" src={coverSrc} alt={title} />
        </div>
      </div>
      <div className="book-card-content">
        <div className="book-card-details">
          <h2 className="book-card-title">{title}</h2>
          <h3 className="book-card-author">{authors}</h3>
          <p className="book-card-meta">
            <span className="book-card-year">{publishedDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bookcard;
