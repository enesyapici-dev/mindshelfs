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
        <div className="movie-details-button">
          <Link className="movie-details-button">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
