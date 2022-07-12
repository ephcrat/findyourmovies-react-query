import React from "react";
import { NavLink } from "react-router-dom";
import { FcLike, FcHome } from "react-icons/fc";
import "./Navbar.css";
import Switch from "../Switch/Switch";
import MoonIcon from "../Icons/MoonIcon";
import SunIcon from "../Icons/SunIcon";

export default function NavBar({ toggleTheme, isDarkTheme }) {
  return (
    <header className="navbar">
      <div>
        <h3 className="d-inline-block align-top">
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "var(--accent)",
            }}
          >
            FindYourMovie
          </NavLink>
        </h3>
      </div>

      <nav>
        <ul className="list">
          <li className="list-item">
            <NavLink className="d-inline-block align-top" to="/">
              <FcHome />
            </NavLink>
            <NavLink to="/favs">
              <FcLike />
            </NavLink>
          </li>
          <li className="sun">
            <SunIcon />
          </li>
          <li className="switch">
            <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
          </li>
          <li className="moon">
            <MoonIcon />
          </li>
        </ul>
      </nav>
    </header>
  );
}
