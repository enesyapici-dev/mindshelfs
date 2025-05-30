import React from "react";
import "./ShelfFilter.css";

const ShelfFilter = ({ categories, onCategoryChange, selected }) => {
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat.title}
          className={`category-button${
            selected === cat.title ? " active" : ""
          }`}
          onClick={() => onCategoryChange(cat.title)}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
};

export default ShelfFilter;
