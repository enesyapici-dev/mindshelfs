import { useState } from "react";
import "./App.css";
import Bookshelf from "./pages/Bookshelf/Bookshelf";
import Movieshelf from "./pages/Movieshelf/Movieshelf";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/bookshelf" element={<Bookshelf />}></Route>
          <Route path="/movieshelf" element={<Movieshelf />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
