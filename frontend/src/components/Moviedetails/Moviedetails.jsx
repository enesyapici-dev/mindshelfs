import React, { useState } from "react";
import "./Moviedetails.css";
import Loading from "../Loading/Loading";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

const Moviedetails = ({ movie, onBack, loading, onAddToWatchlist }) => {
  const [userRating, setUserRating] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  if (loading) return <Loading />;
  if (!movie) return null;
  const { title, release_date, vote_average, poster_path, runtime, credits } =
    movie;
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
      userStats: {
        isWatched: true,
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
    onAddToWatchlist(createDbMovieObject(movie));
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
        {movie.userStats?.isWatched ? (
          <div className="movie-details-user-cont">
            <h2>User Stats</h2>
            <span className="movie-card-user-rating">
              Your Rating: <span>★</span> {movie.userStats.userRating}/10
            </span>
            <span className="movie-card-watched-date">
              {movie.userStats.watchDate}
            </span>
            <div className="movie-buttons-cont">
              <button
                className="movie-details-button"
                onClick={() => onAddToWatchlist(createDbMovieObject(movie))}
              >
                Edit
              </button>
              <button className="movie-details-button">Delete</button>
            </div>
          </div>
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
              <button className="movie-details-button">Add to Watchlist</button>
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
