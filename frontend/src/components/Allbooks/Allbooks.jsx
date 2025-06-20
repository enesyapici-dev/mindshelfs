import React from "react";
import Booklist from "../Booklist/Booklist";

const Allbooks = ({ books, onBookClick }) => {
  return (
    <div>
      <Booklist books={books} onBookClick={onBookClick} />
    </div>
  );
};

export default Allbooks;
