import React, { useState } from "react";
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
}) => {
  const [userRating, setUserRating] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editRating, setEditRating] = useState(
    movie?.userStats?.userRating || 0
  );
  const [editDate, setEditDate] = useState(movie?.userStats?.watchDate || "");

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

  const handleMarkAsWatched = () => {
    if (userRating === 0) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2100);
      return;
    }
    handleAddToWatched(createDbMovieObject(movie));
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
        // Boş userStats objesi ekle - UNUTMA!
        userRating: 0,
        watchDate: [],
      },
    };
  };
  const handleAddToWatchlater = () => {
    handleAddtoWatchlater(createWatchlaterMovieObject(movie));
  };
  return (
    <div className="movie-details-cont">
      <button className="movie-details-back-btn" onClick={onBack}>
        <IoIosArrowBack />
      </button>
      <div className="movie-details-global">
        <img
          className="movie-details-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={title}
        />
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
              <span>Edit your rating:</span>
              <StarRating
                value={editRating}
                onChange={setEditRating}
                max={10}
              />
              <span>Edit watch date:</span>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </div>
            <div className="movie-buttons-cont user-stats-buttons">
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
          showWarning ? (
            <div className="movie-details-user-cont">
              <span className="delete-q">
                Do You Want to Remove {movie.title} From Watched Movies?
              </span>
              <div className="movie-buttons-cont">
                <button
                  className="movie-details-button delete-no"
                  onClick={() => {
                    setShowWarning(false);
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
                </button>
                <button
                  className="movie-details-button stats-button"
                  onClick={() => {
                    setShowWarning(true);
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
              <button
                className="movie-details-button"
                onClick={handleAddToWatchlater}
              >
                Add to Watchlater
              </button>
            </div>
            {showWarning && (
              <span className="warning-toast">Please rate the movie!</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Moviedetails;
