import React, { useEffect, useState } from "react";
import WatchedMovies from "../../components/Watchedmovies/WatchedMovies";
import "./Movieshelf.css";
import Searchbar from "../../components/Searchbar/Searchbar";
import ShelfFilter from "../../components/ShelfFilter/ShelfFilter";
import { getPopulerMovies, searchMovies } from "../../services/api";
const Movieshelf = () => {
  const categories = [
    { title: "Watched" },
    { title: "Watch List" },
    { title: "Favorites" },
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
