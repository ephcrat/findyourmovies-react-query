import React from "react";
import { connect, useSelector } from "react-redux";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";
import { RemoveMovieFavorite } from "../../actions";
import "./Favorites.css";
import styles from "./Favorites.module.css";

export function ConnectedList({ RemoveMovieFavorite }) {
  const moviesFavourites = useSelector((state) => state.moviesFavourites);

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
                onClick={() => RemoveMovieFavorite(movie)}
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

export default connect(
  (state) => ({
    moviesFavourites: state.moviesFavourites,
  }),
  { RemoveMovieFavorite }
)(ConnectedList);
