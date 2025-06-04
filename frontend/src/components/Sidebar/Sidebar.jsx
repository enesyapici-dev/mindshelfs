import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-cont">
      <div className="menu-content">
        <ul className="sidemenu-list">
          <li className="sidemenu-li">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="sidemenu-li">
            <Link to="/movieshelf" className="link">
              Movieshelfs
            </Link>
          </li>
          <li className="sidemenu-li">
            <Link to="/bookshelf" className="link">
              Bookhelfs
            </Link>
          </li>
        </ul>
      </div>
      <div className="menu-button">
        <p className="arrow-icon">▶</p>
      </div>
    </div>
  );
};

export default Sidebar;
