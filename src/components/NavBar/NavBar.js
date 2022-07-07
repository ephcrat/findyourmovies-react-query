import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

export default function NavBar() {
  return (
    <header className="navbar">
      <div>
        <h3 className="d-inline-block align-top" style={{ color: "white" }}>
          <NavLink
            style={{ textDecoration: "none", color: "white" }}
            exact
            to="/"
          >
            FindYourMovie
          </NavLink>
        </h3>
      </div>

      <nav>
        <ul className="list">
          <li className="list-item">
            <NavLink className="d-inline-block align-top" exact to="/">
              Home
            </NavLink>
            <NavLink to="/favs">Favorites</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
