import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-header">
          <h1>Movies</h1>
        </div>
        <div className="footer-buttons">
          <button className="button-translate">Translate</button>
          <button className="button-theme">Theme</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
