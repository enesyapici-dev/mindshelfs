import { useState } from "react";
import "./App.css";
import Moviecard from "./components/Moviecard/Moviecard";
import Movielist from "./components/Movielist/Movielist";

function App() {
  const [count, setCount] = useState(0);
  const movieDummy = {
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    duration: 148,
    rating: 8.8,
    url: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg",
  };

  const userStats = {
    rating: 9,
    watchedDate: "2024-05-10",
  };

  return (
    <>
      <Movielist />
    </>
  );
}

export default App;
