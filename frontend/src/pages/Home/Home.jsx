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
          <Movielist
            movies={[
              {
                _id: "683b4cc9faee87ee3b0e6a36",
                tmdb_id: 1232546,
                title: "Until Dawn",
                poster_path: "/juA4IWO52Fecx8lhAsxmDgy3M3.jpg",
                director: "David F. Sandberg",
                release_date: "2025-04-23",
                vote_average: 6.464,
                duration: 103,
                actors:
                  "Ella Rubin, Michael Cimino, Odessa A'zion, Ji-young Yoo, Belmont Cameli",
                isWatched: true,
                userStats: {
                  userRating: 7,
                  watchDate: ["05.31.2025"],
                  _id: "683b4cc9faee87ee3b0e6a37",
                },
                createdAt: "2025-05-31T18:39:05.102Z",
                updatedAt: "2025-05-31T18:39:05.102Z",
                __v: 0,
              },
              {
                _id: "683b4d50faee87ee3b0e6a53",
                tmdb_id: 552524,
                title: "Lilo & Stitch",
                poster_path: "/3bN675X0K2E5QiAZVChzB5wq90B.jpg",
                director: "Dean Fleischer Camp",
                release_date: "2025-05-17",
                vote_average: 7.1,
                duration: 108,
                actors:
                  "Maia Kealoha, Sydney Agudong, Chris Sanders, Zach Galifianakis, Billy Magnussen",
                isWatched: true,
                userStats: {
                  userRating: 6,
                  watchDate: ["05.31.2025"],
                  _id: "683b4d50faee87ee3b0e6a54",
                },
                createdAt: "2025-05-31T18:41:20.884Z",
                updatedAt: "2025-05-31T18:41:20.884Z",
                __v: 0,
              },
            ]}
            cardType={""}
            homeCard={true}
          />
        </div>
        <div className="recent-book-cont recent-cont">
          <div className="home-movielist-header">
            <h2>Recent Books</h2>
            <Link to="/bookshelf" className="home-link">
              <FaArrowRight />
            </Link>
          </div>

          <Movielist movies={[]} cardType={""} />
        </div>
      </div>
    </div>
  );
};

export default Home;
