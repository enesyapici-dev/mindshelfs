import React from "react";
import "./Searchbar.css";

const Searchbar = ({ onsubmit, onchange, placeholder, value }) => {
  return (
    <div className="search-cont">
      <form onSubmit={onsubmit} className="search-from">
        <input
          type="text"
          placeholder={placeholder}
          className="search-input"
          onChange={onchange}
          value={value}
        />
      </form>
    </div>
  );
};

export default Searchbar;
