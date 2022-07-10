import React from "react";

import Favorites from "./components/Favorites/Favorites";
import Buscador from "./components/Buscador/Buscador";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from "./components/Movie/Movie";
import { useState } from "react";
import useLocalStorage from "use-local-storage";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };
  return (
    <BrowserRouter>
      <div className="dark" data-theme={theme}>
        <NavBar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        <Routes>
          <Route path="/" element={<Buscador />} />
          <Route path="/favs" element={<Favorites />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
