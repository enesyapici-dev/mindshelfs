import React from "react";
import "./Watchlater.css";
import Movielist from "../Movielist/Movielist";
const Watchlater = ({ movies, onMovieClick }) => {
  return (
    <div>
      <div className="watchlater-movies">
        <Movielist
          movies={movies}
          cardType={"watch-later"}
          onMovieClick={onMovieClick}
        />
      </div>
    </div>
  );
};

export default Watchlater;
