import React from "react";
import { connect, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { RemoveMovieFavorite } from "../../actions";
import "./Favorites.css";

export function ConnectedList({ RemoveMovieFavorite }) {
  const moviesFavourites = useSelector((state) => state.moviesFavourites);

  return (
    <div>
      <h2>Favorite Movies</h2>

      <ul>
        {moviesFavourites.map((movie) => (
          <li key={movie.imdbID}>
            <Link className="link" to={`/movie/${movie.imdbID}`}>
              {movie.Title}
            </Link>
            <button
              style={{ margin: "0.5rem" }}
              onClick={() => RemoveMovieFavorite(movie)}
            >
              X
            </button>
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
