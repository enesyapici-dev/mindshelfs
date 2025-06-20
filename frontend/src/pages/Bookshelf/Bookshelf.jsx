import React, { useEffect } from "react";
import Allbooks from "../../components/Allbooks/Allbooks";
import ShelfFilter from "../../components/ShelfFilter/ShelfFilter";
import Searchbar from "../../components/Searchbar/Searchbar";
import "./Bookshelf.css";
import {
  getBooks,
  addBookToDB,
  deleteBookFromDB,
  updateBookInDB,
} from "../../services/backend";
import { getPopularBooks, searchBooks } from "../../services/api";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import Readlater from "../../components/ReadLater/Readlater";
import Readbooks from "../../components/ReadBooks/Readbooks";
import Mybooks from "../../components/Mybooks/Mybooks";
import Bookdetails from "../../components/Bookdetails/Bookdetails";

const categories = [
  { title: "All Books" },
  { title: "My Books" },
  { title: "Read" },
  { title: "Read Later" },
];

const Bookshelf = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState(categories[0].title);
  const [googleBooks, setGoogleBooks] = useState([]);
  const [dbBooks, setDbBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (filterQuery === "All Books") {
      getPopularBooks()
        .then((popularBooks) => {
          setGoogleBooks(popularBooks);
          setBooks(popularBooks);
        })
        .catch(() => setError("Failed to load books..."))
        .finally(() => setLoading(false));
    } else {
      getBooks()
        .then((booksFromDB) => {
          setDbBooks(booksFromDB);
          if (filterQuery === "Read") {
            setBooks(booksFromDB.filter((book) => book.isRead));
          } else if (filterQuery === "Read Later") {
            setBooks(booksFromDB.filter((book) => !book.isRead));
          } else if (filterQuery === "My Books") {
            setBooks(booksFromDB);
          }
        })
        .catch(() => setError("Failed to load your books..."))
        .finally(() => setLoading(false));
    }

    setSearchQuery("");
  }, [filterQuery]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      if (filterQuery === "All Books") {
        setBooks(googleBooks);
      } else if (filterQuery === "Read") {
        setBooks(dbBooks.filter((book) => book.isRead));
      } else if (filterQuery === "Read Later") {
        setBooks(dbBooks.filter((book) => !book.isRead));
      } else {
        setBooks(dbBooks);
      }
    } else {
      if (filterQuery === "All Books") {
        setLoading(true);
        try {
          const results = await searchBooks(value.trim());
          setBooks(results);
        } catch {
          setError("Failed to search books...");
        } finally {
          setLoading(false);
        }
      } else {
        let filteredBooks = [];

        if (filterQuery === "Read") {
          filteredBooks = dbBooks.filter(
            (book) =>
              book.isRead &&
              book.title.toLowerCase().includes(value.toLowerCase())
          );
        } else if (filterQuery === "Read Later") {
          filteredBooks = dbBooks.filter(
            (book) =>
              !book.isRead &&
              book.title.toLowerCase().includes(value.toLowerCase())
          );
        } else {
          filteredBooks = dbBooks.filter((book) =>
            book.title.toLowerCase().includes(value.toLowerCase())
          );
        }

        setBooks(filteredBooks);
      }
    }
  };

  const handleAddToRead = async (book) => {
    const bookForDB = {
      google_books_id: book.id,
      title: book.volumeInfo.title,
      cover_image_url: book.volumeInfo.imageLinks?.thumbnail || "",
      author: book.volumeInfo.authors?.join(", ") || "Unknown",
      published_date: book.volumeInfo.publishedDate || "",
      isRead: true,
      userStats: {
        userRating: 8,
        watchDate: [new Date().toISOString().split("T")[0]],
      },
    };

    try {
      const result = await addBookToDB(bookForDB);
      setDbBooks((prev) => [...prev, result]);
    } catch (error) {
      setError("Failed to add book");
    }
  };

  const handleAddToReadLater = async (book) => {
    const bookForDB = {
      google_books_id: book.id,
      title: book.volumeInfo.title,
      cover_image_url: book.volumeInfo.imageLinks?.thumbnail || "",
      author: book.volumeInfo.authors?.join(", ") || "Unknown",
      published_date: book.volumeInfo.publishedDate || "",
      isRead: false,
      userStats: {
        userRating: null,
        watchDate: null,
      },
    };

    try {
      const result = await addBookToDB(bookForDB);
      setDbBooks((prev) => [...prev, result]);
    } catch (error) {
      setError("Failed to add book");
    }
  };

  const handleUpdateBook = async (updatedBook) => {
    try {
      const result = await updateBookInDB(updatedBook);
      setDbBooks((prev) =>
        prev.map((book) => (book._id === result._id ? result : book))
      );
      setBooks((prev) =>
        prev.map((book) => (book._id === result._id ? result : book))
      );
    } catch (error) {
      setError("Failed to update book");
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBookFromDB(id);
      setDbBooks((prev) => prev.filter((book) => book._id !== id));
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (error) {
      setError("Failed to delete book");
    }
  };

  const handleCategoryChange = (category) => {
    setFilterQuery(category);
    setSearchQuery("");
  };
  const handleBackFromDetails = () => setSelectedBook(null);
  return (
    <div className="books-page">
      <div className="bookshelf-cont">
        <Searchbar
          placeholder={"Search books..."}
          onchange={handleChange}
          value={searchQuery}
        />
        <ShelfFilter
          categories={categories}
          selected={filterQuery}
          onCategoryChange={handleCategoryChange}
        />
        {selectedBook ? (
          <Bookdetails
            book={selectedBook}
            onBack={handleBackFromDetails}
            loading={loading}
            handleAddToRead={handleAddToRead}
            handleDeleteRead={handleDeleteBook}
            handleUpdateRead={handleUpdateBook}
            handleAddToReadLater={handleAddToReadLater}
            readBooks={dbBooks.filter((b) => b.isRead)}
            handleDeleteReadLater={handleDeleteBook}
          />
        ) : loading ? (
          <Loading />
        ) : error ? (
          <p>{error}</p>
        ) : filterQuery === "Read" ? (
          <Readbooks
            books={books}
            onUpdate={handleUpdateBook}
            onDelete={handleDeleteBook}
            onBookClick={setSelectedBook}
          />
        ) : filterQuery === "Read Later" ? (
          <Readlater
            books={books}
            onUpdate={handleUpdateBook}
            onDelete={handleDeleteBook}
            onBookClick={setSelectedBook}
          />
        ) : filterQuery === "My Books" ? (
          <Mybooks
            books={books}
            onUpdate={handleUpdateBook}
            onDelete={handleDeleteBook}
            onBookClick={setSelectedBook}
          />
        ) : (
          <Allbooks
            books={books}
            onAddToRead={handleAddToRead}
            onAddToReadLater={handleAddToReadLater}
            onBookClick={setSelectedBook}
          />
        )}
      </div>
    </div>
  );
};

export default Bookshelf;
