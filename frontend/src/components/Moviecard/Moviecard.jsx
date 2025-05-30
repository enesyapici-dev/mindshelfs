import React from "react";
import "./Moviecard.css";
import { IoMdMenu } from "react-icons/io";
import { TfiLayoutMenuSeparated } from "react-icons/tfi";
import { TfiMoreAlt } from "react-icons/tfi";

const Moviecard = ({ movie, cardType, onClick }) => {
  const isAllMovie = cardType === "allmoviecard";
  const isWatched = cardType === "watched";

  const title = movie.title;

  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const year = movie.release_date
    ? movie.release_date.toString().slice(0, 4)
    : "";
  const rating = Number(movie.vote_average).toFixed(1);

  const director = isAllMovie ? "" : movie.director;
  const duration = isAllMovie ? "" : movie.duration;

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-card-media">
        <img className="movie-card-poster" src={poster} alt={title} />
      </div>

      <div className="movie-card-content">
        <div className="movie-card-details">
          <h2 className="movie-card-title">{title}</h2>
          <h3 className="movie-card-director">{isWatched ? director : ""}</h3>
          <div className={movie.userStats ? "" : "movie-card-row"}>
            <p className="movie-card-meta">
              <span className="movie-card-year">{year}</span>
              {isWatched && (
                <>
                  <span className="movie-card-separator"> • </span>
                  <span className="movie-card-duration">{duration} min</span>
                </>
              )}
            </p>
            <p className="movie-card-rating">
              <span>★ </span>
              {rating}
            </p>
          </div>
        </div>

        {movie.userStats ? (
          <div className="watched-card-details">
            <span className="watched-card-user-rating">
              Your Rating: <span className="star">★</span>
              {movie.userStats.userRating}/10
            </span>
            <span className="watched-card-date">
              {movie.userStats.watchDate}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Moviecard;
