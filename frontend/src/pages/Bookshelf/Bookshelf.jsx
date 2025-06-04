import React, { useEffect } from "react";
import Allbooks from "../../components/Allbooks/Allbooks";
import ShelfFilter from "../../components/ShelfFilter/ShelfFilter";
import Searchbar from "../../components/Searchbar/Searchbar";
import "./Bookshelf.css";
import { getPopularBooks } from "../../services/api";
import { useState } from "react";

const categories = [
  { title: "All Books" },
  { title: "Read" },
  { title: "Read Later" },
];

const Bookshelf = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const popularBooks = await getPopularBooks();
        setAllBooks(popularBooks);
        console.log(popularBooks);
      } catch {
        console.error("Failed to load books...");
      }
    };
    fetchBooks();
  }, []);
  return (
    <div className="books-page">
      <div className="bookshelf-cont">
        <Searchbar placeholder={"Search books..."} />
        <ShelfFilter categories={categories} />
        <Allbooks books={allBooks} />
      </div>
    </div>
  );
};

export default Bookshelf;
