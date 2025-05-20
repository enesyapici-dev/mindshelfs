import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Mindshelfs</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/movieshelfs">Movieshelfs</Link>
        <Link to="/bookshelfs">Bookhelfs</Link>
      </div>
    </nav>
  );
};

export default Navbar;
