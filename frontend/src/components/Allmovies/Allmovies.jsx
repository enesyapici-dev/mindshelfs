import React from "react";
import "./Allmovies.css";
import Movielist from "../Movielist/Movielist";
const Allmovies = ({ movies, onMovieClick }) => {
  return (
    <div>
      <Movielist
        movies={movies}
        cardType={"allmoviecard"}
        onMovieClick={onMovieClick}
      />
    </div>
  );
};

export default Allmovies;
