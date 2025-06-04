import React from "react";
import Allbooks from "../../components/Allbooks/Allbooks";
import ShelfFilter from "../../components/ShelfFilter/ShelfFilter";
import Searchbar from "../../components/Searchbar/Searchbar";
import "./Bookshelf.css";

const categories = [
  { title: "All Books" },
  { title: "Read" },
  { title: "Read Later" },
];

const Bookshelf = () => {
  return (
    <div className="books-page">
      <div className="bookshelf-cont">
        <Searchbar placeholder={"Search books..."} />
        <ShelfFilter categories={categories} />
        <Allbooks />
      </div>
    </div>
  );
};

export default Bookshelf;
