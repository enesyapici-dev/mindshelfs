import { useState } from "react";
import "./App.css";
import Moviecard from "./components/Moviecard/Moviecard";
import Movielist from "./components/Movielist/Movielist";
import Bookshelf from "./pages/Bookshelf/Bookshelf";
import Movieshelf from "./pages/Movieshelf/Movieshelf";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Movieshelf />
    </>
  );
}

export default App;
