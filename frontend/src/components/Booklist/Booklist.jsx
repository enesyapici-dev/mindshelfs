import React from "react";
import Bookcard from "../Bookcard/Bookcard";
import "./Booklist.css";

const Booklist = ({ books, homeCard, onBookClick }) => {
  return (
    <div className={!homeCard ? "book-list" : "book-list home-homelist"}>
      {books.map((book) => (
        <div key={book.id}>
          <Bookcard book={book} onClick={() => onBookClick(book)} />
        </div>
      ))}
    </div>
  );
};

export default Booklist;
