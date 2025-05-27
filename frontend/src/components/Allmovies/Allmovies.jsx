import React from "react";
import "./Allmovies.css";
import Movielist from "../Movielist/Movielist";
const Allmovies = ({ movies, onToggle }) => {
  return (
    <div>
      <Movielist
        movies={movies}
        cardType={"allmoviecard"}
        onToggle={onToggle}
      />
    </div>
  );
};

export default Allmovies;
