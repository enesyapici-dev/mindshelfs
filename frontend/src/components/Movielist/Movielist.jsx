import React from "react";
import Moviecard from "../Moviecard/Moviecard";
import "./Movielist.css";

const Movielist = ({ movies, cardType }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.title}>
          <hr className="movie-divider" />
          <Moviecard
            movie={movie}
            userStats={movie.userStats}
            cardType={cardType}
          />
        </div>
      ))}
    </div>
  );
};

export default Movielist;
