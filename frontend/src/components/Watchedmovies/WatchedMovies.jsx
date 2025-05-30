import React, { useState } from "react";
import Movielist from "../Movielist/Movielist";

import "./WatchedMovies.css";

const WatchedMovies = ({ movies, onMovieClick }) => {
  return (
    <div className="watched-movies">
      <Movielist
        movies={movies}
        cardType={"watched"}
        onMovieClick={onMovieClick}
      />
    </div>
  );
};

export default WatchedMovies;
