import React from "react";
import "./Moviecard.css";
import { IoMdMenu } from "react-icons/io";
import { TfiLayoutMenuSeparated } from "react-icons/tfi";
import { TfiMoreAlt } from "react-icons/tfi";

const Moviecard = ({ movie, cardType, onClick, homeCard }) => {
  const isAllMovie = cardType === "allmoviecard";
  const isWatched = cardType === "watched";
  const isWatchLater = cardType === "watch-later";
  const title = movie.title;
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const year = movie.release_date
    ? movie.release_date.toString().slice(0, 4)
    : "";
  const rating = Number(movie.vote_average).toFixed(1);
  const director = isAllMovie ? "" : movie.director;
  const duration = isAllMovie ? "" : movie.duration;

  const formatCreatedDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };
  const getLatestWatchDate = () => {
    if (!movie.userStats?.watchDate) return "";

    const watchDates = Array.isArray(movie.userStats.watchDate)
      ? movie.userStats.watchDate
      : [movie.userStats.watchDate];

    const latestDate = watchDates[watchDates.length - 1] || "";

    if (!latestDate) return "";

    const date = new Date(latestDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}.${day}.${year}`;
  };

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-card-media">
        <img className="movie-card-poster" src={poster} alt={title} />
      </div>

      <div className="movie-card-content">
        {!homeCard ? (
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
        ) : (
          ""
        )}

        {/* Watch-later*/}
        {isWatchLater ? (
          <div className="watchlater-card-details">
            <span className="watchlater-card-added-date">
              <span>Added</span>{" "}
              <span>{formatCreatedDate(movie.createdAt)}</span>
            </span>
          </div>
        ) : movie.userStats ? (
          <div className="watched-card-details">
            <span className="watched-card-user-rating">
              <span>Your Rating</span>
              <span>
                <span className="star">★</span>
                {movie.userStats.userRating}/10
              </span>
            </span>
            <span className="watched-card-date">{getLatestWatchDate()}</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Moviecard;
