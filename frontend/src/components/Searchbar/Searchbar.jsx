import React from "react";
import "./Searchbar.css";

const Searchbar = ({ onsubmit, onchange, placeholder }) => {
  const watchedsubmit = () => {};
  return (
    <div>
      <form onSubmit={onsubmit}>
        <input
          type="text"
          placeholder={placeholder}
          className="search-input"
          onChange={onchange}
        />
      </form>
    </div>
  );
};

export default Searchbar;
