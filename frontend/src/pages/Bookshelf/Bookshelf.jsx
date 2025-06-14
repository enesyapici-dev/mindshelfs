import React, { useEffect } from "react";
import Allbooks from "../../components/Allbooks/Allbooks";
import ShelfFilter from "../../components/ShelfFilter/ShelfFilter";
import Searchbar from "../../components/Searchbar/Searchbar";
import "./Bookshelf.css";
import { getPopularBooks, searchBooks } from "../../services/api";
import { useState } from "react";

const categories = [
  { title: "All Books" },
  { title: "My Books" },
  { title: "Read" },
  { title: "Read Later" },
];

const Bookshelf = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState(categories[0].title);
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getPopularBooks()
      .then((popularBooks) => {
        setAllBooks(popularBooks);
        setBooks(popularBooks);
      })
      .catch(() => setError("Failed to load books..."))
      .finally(() => setLoading(false));
    setSearchQuery("");
  }, []);

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      setBooks(allBooks);
    } else {
      setLoading(true);
      try {
        const results = await searchBooks(value.trim());
        setBooks(results);
      } catch {
        setError("Failed to search books...");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="books-page">
      <div className="bookshelf-cont">
        <Searchbar
          placeholder={"Search books..."}
          onchange={handleChange}
          value={searchQuery}
        />
        <ShelfFilter categories={categories} selected={"All Books"} />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Allbooks books={books} />
        )}
      </div>
    </div>
  );
};

export default Bookshelf;
