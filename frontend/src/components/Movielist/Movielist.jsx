import React from "react";
import Moviecard from "../Moviecard/Moviecard";
import "./Movielist.css";

const Movielist = ({ movies, cardType, onMovieClick }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id}>
          <Moviecard
            movie={movie}
            userStats={movie.userStats}
            cardType={cardType}
            onClick={() => onMovieClick(movie.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Movielist;
