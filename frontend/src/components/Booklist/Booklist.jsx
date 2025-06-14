import React from "react";
import Bookcard from "../Bookcard/Bookcard";
import "./Booklist.css";

const Booklist = ({ books, homeCard }) => {
  return (
    <div className={!homeCard ? "book-list" : "book-list home-homelist"}>
      {books.map((book) => (
        <div key={book.id}>
          <Bookcard book={book} />
        </div>
      ))}
    </div>
  );
};

export default Booklist;
