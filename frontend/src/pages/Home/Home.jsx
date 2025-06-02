import React from "react";
import "./Home.css";
import Movielist from "../../components/Movielist/Movielist";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-cont">
      <h1 className="home-header">Welcome to Mindshelves</h1>
      <div className="home-content">
        <div className="recent-movie-cont recent-cont">
          <div className="home-movielist-header">
            <h2>Recent Movies</h2>
            <Link to="/movieshelf" className="home-link">
              <FaArrowRight />
            </Link>
          </div>
          <Movielist className="home-movielist" movies={[]} cardType={""} />
        </div>
        <div className="recent-book-cont recent-cont">
          <div className="home-movielist-header">
            <h2>Recent Books</h2>
            <Link to="/bookshelf" className="home-link">
              <FaArrowRight />
            </Link>
          </div>

          <Movielist className="home-movielist" movies={[]} cardType={""} />
        </div>
      </div>
    </div>
  );
};

export default Home;
