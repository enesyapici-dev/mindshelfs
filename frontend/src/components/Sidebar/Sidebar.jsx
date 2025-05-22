import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-cont">
      <div className="menu-content">
        <ul className="sidemenu-list">
          <li className="sidemenu-li">Home</li>
          <li className="sidemenu-li">Movies</li>
          <li className="sidemenu-li">Books</li>
        </ul>
      </div>
      <div className="menu-button">
        <p className="arrow-icon">▶</p>
      </div>
    </div>
  );
};

export default Sidebar;
