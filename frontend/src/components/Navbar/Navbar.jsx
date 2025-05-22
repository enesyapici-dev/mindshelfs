import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-brand">
          <Link to="/" className="nav-brand">
            Mindshelfs
          </Link>
        </h1>
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/movieshelf" className="nav-link">
            Movieshelfs
          </Link>
          <Link to="/bookshelfs" className="nav-link">
            Bookhelfs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
