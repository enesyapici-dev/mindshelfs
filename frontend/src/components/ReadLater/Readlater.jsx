import React from "react";
import "./Readlater.css";
import Booklist from "../Booklist/Booklist";

const Readlater = ({ books, onBookClick }) => {
  return (
    <div>
      <div className="readlater-books">
        <Booklist
          books={books}
          cardType={"read-later"}
          onBookClick={onBookClick}
        />
      </div>
    </div>
  );
};

export default Readlater;
