import React, { useEffect, useState, useCallback } from "react";
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
import Watchlater from "../../components/Watchlater/Watchlater";
import Filterbar from "../../components/Filterbar/Filterbar";

// Category options for filtering movies
const categories = [
  { title: "All Movies" },
  { title: "Watched" },
  { title: "Watch Later" },
];

const Movieshelf = () => {
  // --- State ---
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
  const [yearSort, setYearSort] = useState("desc");
  const [titleSort, setTitleSort] = useState("none");
  const [yearFilter, setYearFilter] = useState("All");
  // --- Effects ---
  // Fetch watched movies on mount
  useEffect(() => {
    getWatchedMovies().then(setWatchedMovies);
  }, []);

  // Fetch movie details when a movie is selected
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

  // Fetch movies based on filter
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
    } else if (filterQuery === "Watch Later") {
      getWatchedMovies()
        .then((allMovies) => {
          const watchLaterMovies = allMovies.filter(
            (movie) => !movie.isWatched
          );
          setAllMovies(watchLaterMovies);
          setMovies(watchLaterMovies);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load movies...");
        })
        .finally(() => setLoading(false));
    }
    setSearchQuery("");
  }, [filterQuery]);

  // --- Handlers ---

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (filterQuery === "Watched" || filterQuery === "Watch Later") {
      if (value.trim() === "") {
        getWatchedMovies().then(setWatchedMovies);
      } else {
        const filtered = watchedMovies.filter((movie) =>
          movie.title.toLowerCase().includes(value.trim().toLowerCase())
        );
        setWatchedMovies(filtered);
      }
    } else if (filterQuery === "All Movies") {
      if (value.trim() === "") {
        setMovies(allMovies);
      } else {
        setLoading(true);
        try {
          const results = await searchMovies(value.trim());
          setMovies(results);
        } catch {
          setError("Failed to search movies...");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  // Category filter change
  const handleCategoryChange = (category) => {
    setFilterQuery(category);
    setSelectedMovieId(null);
    setMovieDetails(null);
  };

  // Add movie to watched
  const handleAddToWatched = async (movie) => {
    await addMovieToDB(movie);
    setWatchedMovies((prev) => [...prev, movie]);
  };

  // Delete movie from watched
  const handleDeleteWatched = async (id) => {
    await deleteMovieFromDB(id);
    setWatchedMovies((prev) => prev.filter((movie) => movie._id !== id));
    setMovies((prev) => prev.filter((movie) => movie._id !== id));
  };
  // Delete movie from watch-later
  const handleRemoveFromWatchlater = async (id) => {
    await deleteMovieFromDB(id);
    setWatchedMovies((prev) => prev.filter((movie) => movie._id !== id));
  };

  // Update watched movie
  const handleUpdateWatched = async (updatedMovie) => {
    const updated = await updateMovieInDB(updatedMovie);
    setWatchedMovies((prev) =>
      prev.map((movie) => (movie._id === updated._id ? updated : movie))
    );
    setMovieDetails(updated);
  };
  // Add movie to watchlater
  const handleAddtoWatchlater = async (movie) => {
    try {
      const result = await addMovieToDB(movie);
      setWatchedMovies((prev) => [...prev, result]);
    } catch (error) {
      console.error("Error adding to watchlater:", error);
    }
  };
  const handleSort = (type, order) => {
    if (type === "year") {
      setYearSort(order);
      if (order !== "none") setTitleSort("none");
    } else if (type === "title") {
      setTitleSort(order);
      if (order !== "none") setYearSort("none");
    }
  };

  const handleYearFilter = useCallback((year) => {
    setYearFilter(year);
  }, []);

  const sortMovies = (movies) => {
    let filteredMovies = movies;

    // Year filtering based on current view
    if (yearFilter !== "All") {
      filteredMovies = movies.filter((movie) => {
        if (filterQuery === "All Movies") {
          // For All Movies, filter by release date year
          if (movie.release_date) {
            const releaseYear = new Date(movie.release_date).getFullYear();
            return releaseYear === parseInt(yearFilter);
          }
        } else if (filterQuery === "Watched") {
          // For Watched movies, filter by watch date years
          if (movie.userStats?.watchDate) {
            const watchDates = Array.isArray(movie.userStats.watchDate)
              ? movie.userStats.watchDate
              : [movie.userStats.watchDate];

            // Check if any watch date matches the selected year
            return watchDates.some((date) => {
              if (date) {
                const [month, day, year] = date.split(".");
                return parseInt(year) === parseInt(yearFilter);
              }
              return false;
            });
          }
        } else if (filterQuery === "Watch Later") {
          // For Watch Later, filter by creation date year
          if (movie.createdAt) {
            const createdYear = new Date(movie.createdAt).getFullYear();
            return createdYear === parseInt(yearFilter);
          }
        }
        return false;
      });
    }
    if (yearSort !== "none") {
      return [...filteredMovies].sort((a, b) => {
        let dateA, dateB;

        if (filterQuery === "Watch Later") {
          dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
          dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        } else if (filterQuery === "Watched") {
          const getLatestWatchDate = (movie) => {
            if (!movie.userStats?.watchDate) return new Date(0);

            const watchDates = Array.isArray(movie.userStats.watchDate)
              ? movie.userStats.watchDate
              : [movie.userStats.watchDate];

            const latestDate = watchDates[watchDates.length - 1];
            if (!latestDate) return new Date(0);

            const [month, day, year] = latestDate.split(".");
            return new Date(year, month - 1, day);
          };

          dateA = getLatestWatchDate(a);
          dateB = getLatestWatchDate(b);
        } else {
          dateA = a.release_date ? new Date(a.release_date) : new Date(0);
          dateB = b.release_date ? new Date(b.release_date) : new Date(0);
        }

        return yearSort === "asc" ? dateA - dateB : dateB - dateA;
      });
    }
    if (titleSort !== "none") {
      return [...filteredMovies].sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return titleSort === "asc"
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      });
    }

    return filteredMovies;
  };

  // --- Render ---
  return (
    <div className="movie-page">
      <div className="movieshelf-cont">
        <Searchbar
          placeholder={"Search your movies..."}
          onchange={handleChange}
          value={searchQuery}
        />
        <div className="filters-cont">
          <ShelfFilter
            categories={categories}
            onCategoryChange={handleCategoryChange}
            selected={filterQuery}
          />{" "}
          <Filterbar
            onSort={handleSort}
            yearSort={yearSort}
            titleSort={titleSort}
            currentView={filterQuery}
            movies={
              filterQuery === "Watched"
                ? watchedMovies.filter((movie) => movie.isWatched)
                : filterQuery === "Watch Later"
                ? watchedMovies.filter((movie) => !movie.isWatched)
                : movies
            }
            onYearFilter={handleYearFilter}
          />
        </div>
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
            handleDeleteWatchlater={handleRemoveFromWatchlater}
            handleUpdateWatched={handleUpdateWatched}
            handleAddtoWatchlater={handleAddtoWatchlater}
            watchedMovies={watchedMovies}
            onCategoryChange={handleCategoryChange}
          />
        ) : loading ? (
          <Loading />
        ) : error ? (
          <div>
            <p>{error}</p>
          </div>
        ) : filterQuery === "Watched" ? (
          <WatchedMovies
            movies={sortMovies(
              watchedMovies.filter((movie) => movie.isWatched)
            )}
            onMovieClick={(movieId) => setSelectedMovieId(movieId)}
          />
        ) : filterQuery === "Watch Later" ? (
          <Watchlater
            movies={sortMovies(
              watchedMovies.filter((movie) => !movie.isWatched)
            )}
            onMovieClick={(movieId) => setSelectedMovieId(movieId)}
          />
        ) : (
          <Allmovies
            movies={sortMovies(movies)}
            onMovieClick={(movieId) => setSelectedMovieId(movieId)}
          />
        )}
      </div>
    </div>
  );
};

export default Movieshelf;
