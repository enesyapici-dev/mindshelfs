import React, { useEffect, useState } from "react";
import WatchedMovies from "../../components/Watchedmovies/WatchedMovies";
import "./Movieshelf.css";
import Searchbar from "../../components/Searchbar/Searchbar";
import ShelfFilter from "../../components/ShelfFilter/ShelfFilter";
import {
  getMovieDetails,
  getPopulerMovies,
  searchMovies,
} from "../../services/api";
import Allmovies from "../../components/Allmovies/Allmovies";
import Loading from "../../components/Loading/Loading";
import {
  getWatchedMovies,
  addMovieToDB,
  deleteMovieFromDB,
  updateMovieInDB,
} from "../../services/backend";
import Moviedetails from "../../components/Moviedetails/Moviedetails";

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
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    getWatchedMovies().then(setWatchedMovies);
  }, []);

  useEffect(() => {
    if (!selectedMovieId) return;
    setDetailsLoading(true);
    getMovieDetails(selectedMovieId)
      .then((details) => {
        const dbMovie = watchedMovies.find(
          (m) => String(m.tmdb_id) === String(details.id)
        );
        if (dbMovie) {
          details.isWatched = dbMovie.isWatched;
          details.userStats = dbMovie.userStats;
          details._id = dbMovie._id;
        }
        setMovieDetails(details);
      })
      .catch(() => setMovieDetails(null))
      .finally(() => setDetailsLoading(false));
  }, [selectedMovieId, watchedMovies]);

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
    setSelectedMovieId(null);
    setMovieDetails(null);
  };

  const handleAddToWatched = async (movie) => {
    await addMovieToDB(movie);

    setWatchedMovies((prev) => [...prev, movie]);
  };
  const handleDeleteWatched = async (id) => {
    await deleteMovieFromDB(id);
    setWatchedMovies((prev) => prev.filter((movie) => movie._id !== id));
    setMovies((prev) => prev.filter((movie) => movie._id !== id));
    setMovieDetails(null);
    setSelectedMovieId(null);
  };
  const handleUpdateWatched = async (updatedMovie) => {
    const updated = await updateMovieInDB(updatedMovie);

    setWatchedMovies((prev) =>
      prev.map((movie) => (movie._id === updated._id ? updated : movie))
    );
    setMovieDetails(updated);
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
        {selectedMovieId ? (
          <Moviedetails
            movie={movieDetails}
            loading={detailsLoading}
            onBack={() => {
              setSelectedMovieId(null);
              setMovieDetails(null);
            }}
            handleAddToWatched={handleAddToWatched}
            handleDeleteWatched={handleDeleteWatched}
            handleUpdateWatched={handleUpdateWatched}
          />
        ) : loading ? (
          <Loading />
        ) : error ? (
          <div>
            <p>{error}</p>
          </div>
        ) : filterQuery === "Watched" ? (
          <WatchedMovies
            movies={movies}
            onMovieClick={(movieId) => setSelectedMovieId(movieId)}
          />
        ) : filterQuery === "Watch List" ? (
          <Loading />
        ) : (
          <Allmovies
            movies={movies}
            onMovieClick={(movieId) => setSelectedMovieId(movieId)}
          />
        )}
      </div>
    </div>
  );
};

export default Movieshelf;
