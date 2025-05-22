import React, { useState } from "react";
import Movielist from "../Movielist/Movielist";

import "./WatchedMovies.css"

const WatchedMovies = ({movies}) => {
  


  
  return (
    <div className="watched-movies">
      <Movielist movies={movies} cardType={"watched"} />
    </div>
  );
};

export default WatchedMovies;
