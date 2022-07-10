import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";
import { RemoveMovieFavorite } from "../../actions";
import styles from "./Favorites.module.css";

export default function ConnectedList() {
  const moviesFavourites = useSelector((state) => state.moviesFavourites);
  const dispatch = useDispatch();
 
  return (
    <div className="wrapper">
      <h1>Favorite Movies</h1>
      <ul className={styles.moviesGrid}>
        {moviesFavourites.map((movie) => (
          <li key={movie.imdbID} className={styles.movieCard}>
            <Link to={`/movie/${movie.imdbID}`}>
              {" "}
              <img
                src={movie.Poster}
                alt={movie.Title}
                className={styles.movieImage}
              />
            </Link>
            <br />
            <div className={styles.description}>
              <button
                className={styles.button}
                style={{ margin: "0.5rem" }}
                onClick={() => dispatch(RemoveMovieFavorite(movie))}
              >
                <FcLike />
              </button>
              <h2 className={styles.title}>{movie.Title}</h2>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
