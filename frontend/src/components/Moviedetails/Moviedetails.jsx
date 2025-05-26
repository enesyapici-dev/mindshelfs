import React from "react";
import "./Moviedetails.css";
const Moviedetails = () => {
  return (
    <div className="movie-details-cont">
      <div className="movie-details-poster-wrapper">
        <img
          className="movie-details-poster"
          src="https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg"
          alt="..."
        />
        <div className="movie-details-overlay-text">Film Detaylari</div>
      </div>
    </div>
  );
};

export default Moviedetails;
