import React, { useState } from "react";
import "./Footer.css";

const Footer = ({ pageName }) => {
  const [language, setLanguage] = useState("ENG");
  const [theme, setTheme] = useState("light");

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "ENG" ? "TR" : "ENG"));
  };

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-header">
          <h1>{pageName}</h1>
        </div>{" "}
      </div>
    </div>
  );
};

export default Footer;
