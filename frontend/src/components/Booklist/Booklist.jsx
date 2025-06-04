import React from "react";
import Bookcard from "../Bookcard/Bookcard";
import "./Booklist.css";

const Booklist = ({ books, homeCard }) => {
  return (
    <div className={!homeCard ? "book-list" : "book-list home-homelist"}>
      {books.map((book) => (
        <Bookcard key={book.key || book.cover_i || book.title} book={book} />
      ))}
    </div>
  );
};

export default Booklist;
