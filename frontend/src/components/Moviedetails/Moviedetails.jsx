import React from "react";
import "./Moviedetails.css";
const Moviedetails = ({ userStats }) => {
  return (
    <div className="movie-details-cont">
      <div className="movie-details-global">
        <img
          className="movie-details-poster"
          src="https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg"
          alt="..."
        />
        <div className="movie-head-details">
          <h2>Interstaller</h2>
          <h3>Chris Nolan</h3>
          <p>163 min</p>
          <p>2014</p>
          <p className="movie-card-rating details-rating">
            <span>★ </span>
            8.6
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
