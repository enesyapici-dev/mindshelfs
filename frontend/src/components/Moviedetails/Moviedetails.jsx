import React from "react";
import "./Moviedetails.css";
import Loading from "../Loading/Loading";
import { IoIosArrowBack } from "react-icons/io";

const Moviedetails = ({ movie, onBack, loading }) => {
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
    return `${day}.${month}.${year}`;
  };

  const rating = Number(movie.vote_average).toFixed(1);
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
        {movie.userStats ? (
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
