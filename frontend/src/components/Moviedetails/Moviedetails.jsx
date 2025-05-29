import React from "react";
import "./Moviedetails.css";

const Moviedetails = ({ movie, userStats, onBack }) => {
  if (!movie) return null;
  const { title, director, duration, release_date, vote_average, poster_path } =
    movie;

  return (
    <div className="movie-details-cont">
      <button className="movie-details-back-btn" onClick={onBack}>
        ← Back
      </button>
      <div className="movie-details-global">
        <img
          className="movie-details-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={title}
        />
        <div className="movie-head-details">
          <h2>{title}</h2>
          <h3>{director}</h3>
          <p>{duration} min</p>
          <p>{release_date}</p>
          <p className="movie-card-rating details-rating">
            <span>★ </span>
            {vote_average}
          </p>
        </div>
      </div>
      <div className="movie-details-user">
        {userStats ? (
          <>
            <span className="movie-card-user-rating">
              Your Rating: <span>★</span> {userStats.rating}/10
            </span>
            <span className="movie-card-watched-date">
              {userStats.watchedDate}
            </span>
          </>
        ) : (
          <>
            <button className="movie-details-button">Mark as Watched</button>
            <button className="movie-details-button">Add to Watchlist</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Moviedetails;
