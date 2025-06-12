import React, { useState, useEffect } from "react";
import "./Moviedetails.css";
import Loading from "../Loading/Loading";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

const Moviedetails = ({
  movie,
  onBack,
  loading,
  handleAddToWatched,
  handleDeleteWatched,
  handleUpdateWatched,
  handleAddtoWatchlater,
  watchedMovies,
  handleDeleteWatchlater,
}) => {
  const [userRating, setUserRating] = useState(0);
  const [showRatingWarning, setShowRatingWarning] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editRating, setEditRating] = useState(0);
  const [editDate, setEditDate] = useState("");

  useEffect(() => {
    if (movie) {
      setUserRating(0);
      setShowRatingWarning(false);
      setShowDeleteWarning(false);
      setEditMode(false);
      setEditRating(movie?.userStats?.userRating || 0);

      const watchDates = Array.isArray(movie.userStats?.watchDate)
        ? movie.userStats.watchDate
        : movie.userStats?.watchDate
        ? [movie.userStats?.watchDate]
        : [];

      const mostRecentDate =
        watchDates.length > 0 ? watchDates[watchDates.length - 1] : "";

      if (mostRecentDate) {
        const [month, day, year] = mostRecentDate.split(".");
        setEditDate(
          `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
        );
      } else {
        setEditDate("");
      }
    }
  }, [movie]);

  if (loading) return <Loading />;
  if (!movie) return null;
  const {
    title,
    release_date,
    vote_average,
    poster_path,
    runtime,
    credits,
    isWatched,
  } = movie;

  const director = credits?.crew?.find(
    (person) => person.job === "Director"
  )?.name;
  const actors = credits?.cast
    ?.slice(0, 5)
    .map((actor) => actor.name)
    .join(", ");

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${month}.${day}.${year}`;
  };

  const rating = Number(movie.vote_average).toFixed(1);
  const StarRating = ({ value, onChange, max = 10 }) => (
    <div>
      {[...Array(max)].map((_, i) => (
        <FaStar
          key={i}
          size={24}
          color={i < value ? "#ffc107" : "#393E46"}
          style={{ cursor: "pointer" }}
          onClick={() => onChange(i + 1)}
        />
      ))}
    </div>
  );
  const createDbMovieObject = (movie) => {
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10); // "2025-05-31"
    const formattedToday = formatDate(todayStr); // "31.05.2025"
    return {
      tmdb_id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      director: director,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      duration: movie.runtime,
      actors: actors,
      isWatched: true,
      userStats: {
        userRating: userRating,
        watchDate: formattedToday,
      },
    };
  };

  const handleEditWatched = async (updatedMovie) => {
    let formattedDate = editDate;
    if (editDate) {
      const [year, month, day] = editDate.split("-");
      formattedDate = `${month}.${day}.${year}`;
    }

    const existingDates = Array.isArray(movie.userStats?.watchDate)
      ? movie.userStats.watchDate
      : movie.userStats?.watchDate
      ? [movie.userStats.watchDate]
      : [];

    const updatedDates = existingDates.slice(0, -1);

    if (formattedDate) {
      updatedDates.push(formattedDate);
    }

    const movieToUpdate = {
      ...updatedMovie,
      userStats: {
        ...updatedMovie.userStats,
        userRating: editRating,
        watchDate: updatedDates.length > 0 ? updatedDates : [],
      },
    };

    await handleUpdateWatched(movieToUpdate);
  };
  const watchDates = Array.isArray(movie.userStats?.watchDate)
    ? movie.userStats.watchDate
    : movie.userStats?.watchDate
    ? [movie.userStats?.watchDate]
    : [];
  const handleAddWatchDate = async () => {
    const today = new Date();
    const formattedToday = `${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(today.getDate()).padStart(2, "0")}.${today.getFullYear()}`;
    const prevDates = Array.isArray(movie.userStats?.watchDate)
      ? movie.userStats.watchDate
      : movie.userStats?.watchDate
      ? [movie.userStats.watchDate]
      : [];
    console.log(prevDates);
    if (prevDates.includes(formattedToday)) return;
    const updatedMovie = {
      ...movie,
      userStats: {
        ...movie.userStats,
        watchDate: [...prevDates, formattedToday],
      },
    };
    await handleUpdateWatched(updatedMovie);
  };

  const createWatchlaterMovieObject = (movie) => {
    return {
      tmdb_id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      director: director,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      duration: movie.runtime,
      actors: actors,
      isWatched: false,
      userStats: {
        userRating: 0,
        watchDate: [],
      },
    };
  };
  const isAlreadyInWatchlist = watchedMovies?.some(
    (dbMovie) => dbMovie.tmdb_id === movie.id && !dbMovie.isWatched
  );
  const watchlistMovie = watchedMovies?.find(
    (dbMovie) => dbMovie.tmdb_id === movie.id && !dbMovie.isWatched
  );
  const handleAddToWatchlater = () => {
    handleAddtoWatchlater(createWatchlaterMovieObject(movie));
  };
  const handleRemoveFromWatchlist = () => {
    if (watchlistMovie) {
      handleDeleteWatchlater(watchlistMovie._id);
    }
  };
  const handleMarkAsWatched = async () => {
    if (userRating === 0 && !movie.isWatched) {
      setShowRatingWarning(true);
      setTimeout(() => setShowRatingWarning(false), 2100);
      return;
    }

    if (isAlreadyInWatchlist && watchlistMovie) {
      const updatedMovie = {
        ...watchlistMovie,
        isWatched: true,
        userStats: {
          userRating: userRating,
          watchDate: formatDate(new Date().toISOString().slice(0, 10)),
        },
      };
      await handleUpdateWatched(updatedMovie);
    } else {
      await handleAddToWatched(createDbMovieObject(movie));
    }
  };

  return (
    <div className="movie-details-cont">
      <button className="movie-details-back-btn" onClick={onBack}>
        <IoIosArrowBack />
      </button>
      <div className="movie-details-global">
        <a
          href={`https://www.google.com/search?q=${title}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="movie-details-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={title}
          />
        </a>

        <div className="movie-head-details">
          <h2 className="movie-details-title">{title}</h2>
          <h3 className="movie-details-title">{director}</h3>
          <p className="movie-details-title">{runtime} min</p>
          <p className="movie-details-title">{formatDate(release_date)}</p>
          <p className="movie-details-title">{actors}</p>
          <p className="movie-card-rating details-rating">
            <span>★ </span>
            {rating}
            <span>/10 </span>
          </p>
        </div>
      </div>
      <div className="movie-details-user">
        {/* /////////////// */}
        {editMode ? (
          <div className="movie-details-user-cont">
            <div className="movie-details-user-stats">
              <h2 className="user-stats-header">Edit Movie</h2>
              <span className="user-stats-edit-headers">Edit Rating</span>
              <span className="user-stats-edit-stars">
                {" "}
                <StarRating
                  value={editRating}
                  onChange={setEditRating}
                  max={10}
                />
              </span>
              <span className="user-stats-edit-headers">Edit watch date:</span>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="user-stats-edit-date-input"
                onMouseDown={(e) => e.target.showPicker()} // Mouse down'da picker aç
                onKeyDown={(e) => e.preventDefault()} // Klavye girişini engelle
                style={{ caretColor: "transparent" }} // Inline style ile cursor gizle
              />
            </div>
            <div className="movie-buttons-cont user-stats-buttons">
              {" "}
              <button
                className="movie-details-button stats-button"
                onClick={() => {
                  handleEditWatched({
                    ...movie,
                    userStats: {
                      ...movie.userStats,
                      userRating: editRating,
                      watchDate: editDate,
                    },
                  });
                  setEditMode(false);
                }}
              >
                Save
              </button>
              <button
                className="movie-details-button stats-button"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : movie.isWatched ? (
          showDeleteWarning ? (
            <div className="movie-details-user-cont">
              <span className="delete-q">
                Do You Want to Remove {movie.title} From Watched Movies?
              </span>
              <div className="movie-buttons-cont">
                <button
                  className="movie-details-button delete-no"
                  onClick={() => {
                    setShowDeleteWarning(false);
                  }}
                >
                  No
                </button>
                <button
                  className="movie-details-button delete-yes "
                  onClick={() => {
                    handleDeleteWatched(movie._id);
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          ) : (
            <div className="movie-details-user-cont">
              <div className="movie-details-user-stats">
                <h2 className="user-stats-header">User Stats</h2>
                <span className="movie-card-user-rating">
                  Rating: <span>★</span>
                  {movie.userStats.userRating}/10
                </span>

                <span className="movie-card-watched-date">
                  {watchDates.map((date, i) => (
                    <span key={i}>
                      {i + 1} • {date}
                    </span>
                  ))}
                </span>
              </div>
              <div className="movie-buttons-cont user-stats-buttons">
                <button
                  className="movie-details-button stats-button"
                  onClick={handleAddWatchDate}
                >
                  <FaPlus />
                </button>
                <button
                  className="movie-details-button stats-button"
                  onClick={() => setEditMode(true)}
                >
                  <MdModeEdit />
                </button>{" "}
                <button
                  className="movie-details-button stats-button"
                  onClick={() => {
                    setShowDeleteWarning(true);
                  }}
                >
                  <FaTrashCan />
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="movie-details-user-cont">
            <StarRating value={userRating} onChange={setUserRating} max={10} />
            <div className="movie-buttons-cont">
              <button
                className="movie-details-button"
                onClick={handleMarkAsWatched}
              >
                Mark as Watched
              </button>
              {isAlreadyInWatchlist ? (
                <button
                  className="movie-details-button remove-button"
                  onClick={handleRemoveFromWatchlist}
                >
                  Remove from Watchlist
                </button>
              ) : (
                <button
                  className="movie-details-button add-watchlist-button"
                  onClick={handleAddToWatchlater}
                >
                  Add to Watchlater
                </button>
              )}
            </div>{" "}
            {showRatingWarning && (
              <span className="warning-toast">Please rate the movie!</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Moviedetails;
