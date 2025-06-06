import React, { useState, useMemo, useEffect } from "react";
import "./Filterbar.css";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const Filterbar = ({
  onSort,
  yearSort,
  titleSort,
  movies,
  onYearFilter,
  currentView,
}) => {
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState("All");

  // Reset year filter when view changes
  useEffect(() => {
    setSelectedYear("All");
    onYearFilter("All");
  }, [currentView, onYearFilter]);

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
  const availableYears = useMemo(() => {
    if (!movies || movies.length === 0) {
      return [];
    }

    const years = [];

    movies.forEach((movie) => {
      // Determine years based on current view
      if (currentView === "All Movies") {
        // For All Movies, use release_date
        if (movie.release_date) {
          const releaseYear = new Date(movie.release_date).getFullYear();
          if (releaseYear && !isNaN(releaseYear)) {
            years.push(releaseYear);
          }
        }
      } else if (currentView === "Watched") {
        // For Watched movies, use watch dates
        if (movie.userStats?.watchDate) {
          const watchDates = Array.isArray(movie.userStats.watchDate)
            ? movie.userStats.watchDate
            : [movie.userStats.watchDate];

          watchDates.forEach((date) => {
            if (date) {
              const [month, day, year] = date.split(".");
              const yearInt = parseInt(year);
              if (yearInt && !isNaN(yearInt)) {
                years.push(yearInt);
              }
            }
          });
        }
      } else if (currentView === "Watch Later") {
        // For Watch Later, use createdAt (when added to watchlist)
        if (movie.createdAt) {
          const createdYear = new Date(movie.createdAt).getFullYear();
          if (createdYear && !isNaN(createdYear)) {
            years.push(createdYear);
          }
        }
      }
    });

    // Get unique years and sort (newest to oldest)
    const uniqueYears = [...new Set(years)].sort((a, b) => b - a);
    return uniqueYears;
  }, [movies, currentView]);
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setShowYearDropdown(false);

    if (onYearFilter) {
      onYearFilter(year);
    }
  };

  return (
    <div className="filterbar-cont">
      {/* Year Filter Dropdown */}
      <div className="year-filter-container">
        <button
          className={`filterbar-button year-filter-button ${
            selectedYear !== "All" ? "active" : ""
          }`}
          onClick={() => setShowYearDropdown(!showYearDropdown)}
        >
          {selectedYear === "All" ? "All Years" : selectedYear}
          <span className="dropdown-arrow">
            <IoMdArrowDropdown />
          </span>
        </button>
        {showYearDropdown && (
          <div className="year-dropdown">
            <div
              className="year-option"
              onClick={() => handleYearSelect("All")}
            >
              All Years
            </div>
            {availableYears.length > 0 ? (
              availableYears.map((year) => (
                <div
                  key={year}
                  className="year-option"
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </div>
              ))
            ) : (
              <div className="year-option" style={{ color: "#999" }}>
                No years available
              </div>
            )}
          </div>
        )}
      </div>

      {/* Date Sort Button */}
      <button
        className={`filterbar-button ${yearSort !== "none" ? "active" : ""}`}
        onClick={handleYearSort}
      >
        Date {getYearIcon()}
      </button>

      {/* Title Sort Button */}
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
