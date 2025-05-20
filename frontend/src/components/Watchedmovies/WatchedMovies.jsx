import React, { useState } from "react";
import Movielist from "../Movielist/Movielist";
import Searchbar from "../Searchbar/Searchbar";
import "./WatchedMovies.css"

const WatchedMovies = () => {
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

  const [searchQuery, setsearchQuery] = useState("");
  const [movies, setMovies] = useState(moviedata);

  const watchedsubmit = (e) => {
    e.preventDefault();
    console.log("Form submit edildi!");
  };
  const handlechange = (e) => {
    const value = e.target.value;
    setsearchQuery(value);

    const filtered = moviedata.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    setMovies(filtered);
  };
  return (
    <div className="watched-movies">
      <Searchbar
        placeholder={"Search your movies..."}
        onsubmit={watchedsubmit}
        onchange={handlechange}
      />
      <Movielist movies={movies} />
    </div>
  );
};

export default WatchedMovies;
