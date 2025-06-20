import React, { useEffect, useState } from "react";
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
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);

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

  useEffect(() => {
    if (!selectedBookId) return setBookDetails(null);
    const dbBook = dbBooks.find(
      (b) => b._id === selectedBookId || b.google_books_id === selectedBookId
    );
    if (dbBook) {
      setBookDetails(dbBook);
    } else {
      const apiBook = books.find((b) => b.id === selectedBookId);
      setBookDetails(apiBook || null);
    }
  }, [selectedBookId, dbBooks, books]);

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

  const handleAddToRead = async (book, userRating) => {
    const bookForDB = {
      google_books_id: book.id,
      title: book.volumeInfo?.title || book.title,
      cover_image_url:
        book.volumeInfo?.imageLinks?.thumbnail || book.cover_image_url || "",
      author: book.volumeInfo?.authors?.join(", ") || book.author || "Unknown",
      published_date:
        book.volumeInfo?.publishedDate || book.published_date || "",
      isRead: true,
      userStats: {
        userRating: userRating,
        readDate: [new Date().toISOString().split("T")[0]],
      },
    };
    try {
      const result = await addBookToDB(bookForDB);
      setDbBooks((prev) => {
        const filtered = prev.filter(
          (b) =>
            b.google_books_id !== result.google_books_id && b._id !== result._id
        );
        return [...filtered, result];
      });
      setBookDetails(result);
    } catch (error) {
      setError("Failed to add book");
    }
  };

  const handleAddToReadLater = async (book) => {
    const bookForDB = {
      google_books_id: book.id,
      title: book.volumeInfo?.title || book.title,
      cover_image_url:
        book.volumeInfo?.imageLinks?.thumbnail || book.cover_image_url || "",
      author: book.volumeInfo?.authors?.join(", ") || book.author || "Unknown",
      published_date:
        book.volumeInfo?.publishedDate || book.published_date || "",
      isRead: false,
      userStats: {
        userRating: null,
        readDate: null,
      },
    };
    try {
      const result = await addBookToDB(bookForDB);
      setDbBooks((prev) => {
        const filtered = prev.filter(
          (b) =>
            b.google_books_id !== result.google_books_id && b._id !== result._id
        );
        return [...filtered, result];
      });
      setBookDetails(result);
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
      setBookDetails(result);
    } catch (error) {
      setError("Failed to update book");
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBookFromDB(id);
      setDbBooks((prev) => prev.filter((book) => book._id !== id));
      setBookDetails(null);
      setSelectedBookId(null);
    } catch (error) {
      setError("Failed to delete book");
    }
  };

  const handleCategoryChange = (category) => {
    setFilterQuery(category);
    setSearchQuery("");
    setSelectedBookId(null);
    setBookDetails(null);
  };

  const handleBackFromDetails = () => {
    setSelectedBookId(null);
    setBookDetails(null);
  };

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
        {bookDetails ? (
          <Bookdetails
            book={bookDetails}
            onBack={handleBackFromDetails}
            loading={loading}
            handleAddToRead={handleAddToRead}
            handleDeleteRead={handleDeleteBook}
            handleUpdateRead={handleUpdateBook}
            handleAddToReadLater={handleAddToReadLater}
            handleDeleteReadLater={handleDeleteBook}
            dbBooks={dbBooks}
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
            onBookClick={(book) => setSelectedBookId(book._id || book.id)}
          />
        ) : filterQuery === "Read Later" ? (
          <Readlater
            books={books}
            onUpdate={handleUpdateBook}
            onDelete={handleDeleteBook}
            onBookClick={(book) => setSelectedBookId(book._id || book.id)}
          />
        ) : filterQuery === "My Books" ? (
          <Mybooks
            books={books}
            onUpdate={handleUpdateBook}
            onDelete={handleDeleteBook}
            onBookClick={(book) => setSelectedBookId(book._id || book.id)}
          />
        ) : (
          <Allbooks
            books={books}
            onAddToRead={handleAddToRead}
            onAddToReadLater={handleAddToReadLater}
            onBookClick={(book) => setSelectedBookId(book._id || book.id)}
          />
        )}
      </div>
    </div>
  );
};

export default Bookshelf;
