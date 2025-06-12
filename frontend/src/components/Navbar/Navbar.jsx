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

        <ul className="nav-list">
          <li className="nav-list-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/movieshelf" className="nav-link">
              Movieshelfs
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/bookshelf" className="nav-link">
              Bookhelfs
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
