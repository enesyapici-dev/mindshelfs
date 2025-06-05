import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-brand">
          <Link to="/" className="nav-brand">
            Mindshelves
          </Link>
        </h1>

        <Link className="movie-details-button">
          <FaRegUser />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
