import React from "react";
import Booklist from "../Booklist/Booklist";
import "./Readbooks.css";

const Readbooks = ({ books }) => {
  return (
    <div>
      <div className="readlater-books">
        <Booklist books={books} cardType={"read-later"} />
      </div>
    </div>
  );
};

export default Readbooks;
