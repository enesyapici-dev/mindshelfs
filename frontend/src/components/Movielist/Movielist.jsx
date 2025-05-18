import React from "react";
import Moviecard from "../Moviecard/Moviecard";
import "./Movielist.css";

const Movielist = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.title}>
          <hr className="movie-divider" />
          <Moviecard movie={movie} userStats={movie.userStats} />
        </div>
      ))}
    </div>
  );
};

export default Movielist;
