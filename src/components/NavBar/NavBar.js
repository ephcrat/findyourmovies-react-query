import React from "react";
import { NavLink } from "react-router-dom";
import { FcLike, FcHome } from "react-icons/fc";
import "./Navbar.css";
import Switch from "../Switch/Switch";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

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
            <NavLink
              style={{ fontSize: "1.5rem" }}
              className="d-inline-block align-top"
              to="/"
            >
              <FcHome />
            </NavLink>
            <NavLink style={{ fontSize: "1.5rem" }} to="/favs">
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
