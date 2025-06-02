import React from "react";
import Moviecard from "../Moviecard/Moviecard";
import "./Movielist.css";

const Movielist = ({ movies, cardType, onMovieClick, homeCard }) => {
  return (
    <div className={!homeCard ? "movie-list" : "movie-list home-movielist"}>
      {movies.map((movie) => (
        <div key={movie._id || movie.tmdb_id || movie.id}>
          <Moviecard
            movie={movie}
            userStats={movie.userStats}
            cardType={cardType}
            onClick={() => onMovieClick(movie.tmdb_id || movie.id)}
            homeCard={homeCard}
          />
        </div>
      ))}
    </div>
  );
};

export default Movielist;
