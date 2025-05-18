import React from "react";
import "./Moviecard.css";

const Moviecard = ({ movie, userStats }) => {
  return (
    <div className="movie-card">
      <div className="movie-card-media">
        <img className="movie-card-poster" src={movie.url} alt={movie.title} />
      </div>

      <div className="movie-card-content">
        <div className="movie-card-details">
          <h2 className="movie-card-title">{movie.title}</h2>
          <h3 className="movie-card-director">{movie.director}</h3>
          <p className="movie-card-meta">
            <span className="movie-card-year">{movie.year}</span>
            <span className="movie-card-separator"> • </span>
            <span className="movie-card-duration">{movie.duration} min</span>
          </p>
          <p className="movie-card-rating">
            <span>★ </span>
            {movie.rating}
          </p>
        </div>
        <div className="movie-card-user-stats">
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
              <button className="movie-card-button">Mark as Watched</button>
              <button className="movie-cardbutton">Add to Watchlist</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Moviecard;
