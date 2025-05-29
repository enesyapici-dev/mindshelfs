import React, { useEffect, useState } from "react";
import WatchedMovies from "../../components/Watchedmovies/WatchedMovies";
import "./Movieshelf.css";
import Searchbar from "../../components/Searchbar/Searchbar";
import ShelfFilter from "../../components/ShelfFilter/ShelfFilter";
import { getPopulerMovies, searchMovies } from "../../services/api";
import Allmovies from "../../components/Allmovies/Allmovies";
import Loading from "../../components/Loading/Loading";
import { getWatchedMovies } from "../../services/backend";
import Moviedetails from "../../components/Moviedetails/Moviedetails";

const movieData = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    release_date: 2010,
    duration: 148,
    rating: 8.8,
    url: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg",
    userStats: { rating: 9, watchedDate: "2024-05-10" },
  },
  {
    title: "Interstellar",
    director: "Christopher Nolan",
    release_date: 2014,
    duration: 169,
    rating: 8.6,
    url: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
    userStats: { rating: 10, watchedDate: "2024-05-12" },
  },
  {
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    release_date: 1999,
    duration: 136,
    rating: 8.7,
    url: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
    userStats: { rating: 8, watchedDate: "2024-05-15" },
  },
];

const categories = [
  { title: "All Movies" },
  { title: "Watched" },
  { title: "Watch List" },
];

const Movieshelf = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState(categories[0].title);
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDetailsActive, setIsDetailsActive] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleToggle = () => setIsDetailsActive((prev) => !prev);

  useEffect(() => {
    setLoading(true);
    if (filterQuery === "Watched") {
      getWatchedMovies()
        .then((watchedMovies) => {
          setAllMovies(watchedMovies);
          setMovies(watchedMovies);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load movies...");
        })
        .finally(() => setLoading(false));
    } else if (filterQuery === "All Movies") {
      getPopulerMovies()
        .then((popularMovies) => {
          setAllMovies(popularMovies);
          setMovies(popularMovies);
        })
        .catch(() => setError("Failed to load movies..."))
        .finally(() => setLoading(false));
    } else {
      setAllMovies([]);
      setMovies([]);
      setLoading(false);
    }
    setSearchQuery("");
  }, [filterQuery]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (filterQuery === "Watched") {
      const filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setMovies(filtered);
    } else if (filterQuery === "All Movies") {
      if (value.trim() === "") {
        setMovies(allMovies);
      } else {
        setLoading(true);
        try {
          const results = await searchMovies(value);
          setMovies(results);
        } catch {
          setError("Failed to search movies...");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleCategoryChange = (category) => {
    setFilterQuery(category);
  };

  return (
    <div className="movie-page">
      <div className="movieshelf-cont">
        <Searchbar
          placeholder={"Search your movies..."}
          onchange={handleChange}
          value={searchQuery}
        />
        <ShelfFilter
          categories={categories}
          onCategoryChange={handleCategoryChange}
          selected={filterQuery}
        />
        {selectedMovie ? (
          <Moviedetails
            movie={selectedMovie}
            onBack={() => setSelectedMovie(null)}
          />
        ) : loading ? (
          <Loading />
        ) : error ? (
          <div>
            <p>{error}</p>
          </div>
        ) : filterQuery === "Watched" ? (
          <WatchedMovies movies={movies} onMovieClick={setSelectedMovie} />
        ) : filterQuery === "Watch List" ? (
          <Loading />
        ) : (
          <Allmovies movies={movies} onMovieClick={setSelectedMovie} />
        )}
      </div>
      {isDetailsActive ? (
        <div className="movie-side-section">
          <Moviedetails />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Movieshelf;
