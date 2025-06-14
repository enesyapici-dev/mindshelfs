import React from "react";
import "./Watchlater.css";
import Movielist from "../Movielist/Movielist";

const Watchlater = ({ movies, onMovieClick }) => {
  return (
    <div className="watchlater-movies">
      <Movielist
        movies={movies}
        cardType={"watch-later"}
        onMovieClick={onMovieClick}
      />
    </div>
  );
};

export default Watchlater;
