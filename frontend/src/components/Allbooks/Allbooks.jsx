import React from "react";
import Booklist from "../Booklist/Booklist";

const Allbooks = ({ books }) => {
  return (
    <div>
      <Booklist books={books} />
    </div>
  );
};

export default Allbooks;
