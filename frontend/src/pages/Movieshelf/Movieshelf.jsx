import React, { useEffect, useState } from "react";
import WatchedMovies from "../../components/Watchedmovies/WatchedMovies";
import "./Movieshelf.css";
import Searchbar from "../../components/Searchbar/Searchbar";
import ShelfFilter from "../../components/ShelfFilter/ShelfFilter";
import { getPopulerMovies, searchMovies } from "../../services/api";
import Allmovies from "../../components/Allmovies/Allmovies";
const Movieshelf = () => {
  const categories = [
    { title: "All Movies" },
    { title: "Watched" },
    { title: "Watch List" },
  ];
  const moviedata = [
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState(categories[0].title);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopulerMovies();
        setMovies(popularMovies);
        setAllMovies(popularMovies);
      } catch (err) {
        setError("Failed to loading movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    setMovies(filtered);
  };

  const handleCategoryChange = (category) => {
    setFilterQuery(category);
  };
  return (
    <div className="movieshelf-cont">
      <Searchbar
        placeholder={"Search your movies..."}
        onchange={handleChange}
      />
      <ShelfFilter
        categories={categories}
        onCategoryChange={handleCategoryChange}
      />
      {filterQuery === "Watched" ? (
        <WatchedMovies movies={moviedata} />
      ) : filterQuery === "Watch List" ? (
        <h1>WATCH LIST</h1>
      ) : (
        <Allmovies movies={movies} />
      )}
    </div>
  );
};

export default Movieshelf;
