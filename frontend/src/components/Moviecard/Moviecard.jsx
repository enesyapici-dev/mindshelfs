import React from "react";
import "./Moviecard.css";
import { FaRegEye } from "react-icons/fa";

const Moviecard = ({ movie, userStats, cardType, onToggle }) => {
  const isAllMovie = cardType === "allmoviecard";
  const isWatched = cardType === "watched";

  const title = movie.title;

  const poster = isAllMovie
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.poster_path || "";
  const year = movie.release_date
    ? movie.release_date.toString().slice(0, 4)
    : "";
  const rating = isAllMovie
    ? movie.vote_average
      ? Number(movie.vote_average).toFixed(1)
      : ""
    : movie.vote_average;
  const director = isAllMovie ? "" : movie.director;
  const duration = isAllMovie ? "" : movie.duration;

  return (
    <div className="movie-card">
      <div className="movie-card-media">
        <img className="movie-card-poster" src={poster} alt={title} />
      </div>

      <div className="movie-card-content">
        <div className="movie-card-details">
          <h2 className="movie-card-title">{title}</h2>
          <p className="movie-card-rating">
            <span>★ </span>
            {rating}
          </p>
          <h3 className="movie-card-director">{isWatched ? director : ""}</h3>
          <p className="movie-card-meta">
            <span className="movie-card-year">{year}</span>
            {isWatched && (
              <>
                <span className="movie-card-separator"> • </span>
                <span className="movie-card-duration">{duration} min</span>
              </>
            )}
          </p>
        </div>
        <div className="movie-card-user-stats-buttons">
          {userStats ? (
            <>
              <span className="movie-card-user-rating">
                <LuEyeClosed onClick={onToggle} />
              </span>
            </>
          ) : (
            <>
              <p className="movie-card-button">
                <FaRegEye onClick={onToggle} />
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Moviecard;
