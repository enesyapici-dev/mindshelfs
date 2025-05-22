import React, { useState } from "react";
import WatchedMovies from "../../components/Watchedmovies/WatchedMovies";
import "./Movieshelf.css";
import Searchbar from "../../components/Searchbar/Searchbar";
import ShelfFilter from "../../components/ShelfFilter/ShelfFilter";
const Movieshelf = () => {
  const moviedata = [
    {
      title: "Inception",
      director: "Christopher Nolan",
      year: 2010,
      duration: 148,
      rating: 8.8,
      url: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg",
      userStats: { rating: 9, watchedDate: "2024-05-10" },
    },
    {
      title: "Interstellar",
      director: "Christopher Nolan",
      year: 2014,
      duration: 169,
      rating: 8.6,
      url: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
      userStats: { rating: 10, watchedDate: "2024-05-12" },
    },
    {
      title: "The Matrix",
      director: "Lana Wachowski, Lilly Wachowski",
      year: 1999,
      duration: 136,
      rating: 8.7,
      url: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
      userStats: { rating: 8, watchedDate: "2024-05-15" },
    },
  ];
  const categories = [
    { title: "Watched" },
    { title: "Watch List" },
    { title: "Favorites" },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState(categories[0].title);
  const [movies, setMovies] = useState(moviedata);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filtered = moviedata.filter((movie) =>
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
        <WatchedMovies movies={movies} />
      ) : filterQuery === "Watch List" ? (
        <h1>WATCH LIST</h1>
      ) : (
        <h1>fAVORITES</h1>
      )}
    </div>
  );
};

export default Movieshelf;
