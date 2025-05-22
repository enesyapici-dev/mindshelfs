import React from "react";
import "./Searchbar.css";

const Searchbar = ({ onsubmit, onchange, placeholder }) => {
  return (
    <div className="search-cont">
      <form onSubmit={onsubmit} className="search-from">
        <input
          type="text"
          placeholder={placeholder}
          className="search-input"
          onChange={onchange}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
