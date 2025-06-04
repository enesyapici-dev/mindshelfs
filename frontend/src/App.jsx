import { useState } from "react";
import "./App.css";
import Bookshelf from "./pages/Bookshelf/Bookshelf";
import Movieshelf from "./pages/Movieshelf/Movieshelf";
import Home from "./pages/Home/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const location = useLocation();

  let pageName = "Home";
  if (location.pathname === "/bookshelf") pageName = "Bookshelf";
  else if (location.pathname === "/movieshelf") pageName = "Movieshelf";
  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/bookshelf" element={<Bookshelf />}></Route>
          <Route path="/movieshelf" element={<Movieshelf />}></Route>
        </Routes>
      </main>
      <Footer pageName={pageName} />
    </>
  );
}

export default App;
