import React from "react";
import "./Filterbar.css";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const Filterbar = ({ onSort, yearSort, titleSort }) => {
  const handleYearSort = () => {
    let nextSort;
    if (yearSort === "none") nextSort = "desc";
    else if (yearSort === "desc") nextSort = "asc";
    else nextSort = "none";
    onSort("year", nextSort);
  };

  const handleTitleSort = () => {
    let nextSort;
    if (titleSort === "none") nextSort = "desc";
    else if (titleSort === "desc") nextSort = "asc";
    else nextSort = "none";
    onSort("title", nextSort);
  };

  const getYearIcon = () => {
    if (yearSort === "asc") return <IoMdArrowDropup />;
    if (yearSort === "desc") return <IoMdArrowDropdown />;
    return null;
  };

  const getTitleIcon = () => {
    if (titleSort === "asc") return <IoMdArrowDropup />;
    if (titleSort === "desc") return <IoMdArrowDropdown />;
    return null;
  };

  return (
    <div className="filterbar-cont">
      <button
        className={`filterbar-button ${yearSort !== "none" ? "active" : ""}`}
        onClick={handleYearSort}
      >
        Date {getYearIcon()}
      </button>
      <button
        className={`filterbar-button ${titleSort !== "none" ? "active" : ""}`}
        onClick={handleTitleSort}
      >
        Title {getTitleIcon()}
      </button>
    </div>
  );
};

export default Filterbar;
