import React from "react";
import "./Mybooks.css";
import Booklist from "../Booklist/Booklist";

const Mybooks = ({ books, onBookClick }) => {
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

export default Mybooks;
