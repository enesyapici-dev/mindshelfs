import React from "react";
import "./Mybooks.css";
import Booklist from "../Booklist/Booklist";

const Mybooks = ({ books }) => {
  return (
    <div>
      <div className="readlater-books">
        <Booklist books={books} cardType={"read-later"} />
      </div>
    </div>
  );
};

export default Mybooks;
