import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useSearchParams, createSearchParams } from "react-router-dom";
import styles from "./Buscador.module.css";

import {
  FcSearch,
  FcLikePlaceholder,
  FcLike,
  FcRight,
  FcLeft,
} from "react-icons/fc";
import { addMovieFavorite, RemoveMovieFavorite } from "../../actions";
import { useQuery } from "react-query";

export function Buscador({ addMovieFavorite, RemoveMovieFavorite }) {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [page, setPage] = useState(1);
  const search = searchParams.get("search");
  const pageParams = searchParams.get("page");
  const API_KEY = process.env.REACT_APP_API_KEY;

  async function getMovies(titulo, page = 1) {
    return fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${titulo}&type=movie&page=${page}`
    ).then((response) =>
      response.json().then((json) => {
        if (json.Response === "False") return;
        return json.Search;
      })
    );
  }

  const { data: movies } = useQuery(
    ["movies", search, pageParams],
    () => {
      return search && getMovies(search, pageParams);
    },
    {
      enabled: search?.length >= 3,
    }
  );

  const { data: moviesNext } = useQuery(
    ["moviesNext", search, page],
    () => search && getMovies(search, page + 1)
  );

  const moviesFavourites = useSelector((state) => state.moviesFavourites);

  function handleChange(event) {
    event.preventDefault();
    event.target.value
      ? setSearchParams(
          createSearchParams({ search: event.target.value, page: page })
        )
      : removeQueryParams();
  }

  function handleNextPage() {
    if (moviesNext) {
      setPage(page + 1);
      setSearchParams(createSearchParams({ search: search, page: page + 1 }));
    }
  }

  function handlePrevPage() {
    if (page > 1) {
      setPage(page - 1);
      setSearchParams(createSearchParams({ search: search, page: page - 1 }));
    }
    return;
  }

  const removeQueryParams = () => {
    const param = searchParams.get("search");

    if (param) {
      // 👇️ delete each query param
      searchParams.delete("page");
      searchParams.delete("search");

      // 👇️ update state after
      setSearchParams(searchParams);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 style={{ width: "100%" }}>FindYourMovie</h1>
      <form className="form-container">
        <div className={styles.input}>
          <input
            type="text"
            id="title"
            autoComplete="off"
            value={search ?? ""}
            placeholder="Search for a movie..."
            onChange={(e) => handleChange(e)}
          />
          <FcSearch className={styles.icon} style={{ fontSize: "1.5rem" }} />
        </div>
      </form>

      <ul className={styles.moviesGrid}>
        {movies?.map((movie) => (
          <li key={movie.imdbID} className={styles.movieCard}>
            <Link to={`/movie/${movie.imdbID}`}>
              {" "}
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://i.vgy.me/UU2ijc.png"
                }
                alt={movie.Title}
                className={styles.movieImage}
              />
            </Link>
            <br />
            <div className={styles.description}>
              <button
                className={styles.button}
                onClick={() => {
                  moviesFavourites?.find((m) => m.imdbID === movie.imdbID)
                    ? RemoveMovieFavorite(movie)
                    : addMovieFavorite(movie);
                }}
              >
                {moviesFavourites?.find((m) => m.imdbID === movie.imdbID) ? (
                  <FcLike />
                ) : (
                  <FcLikePlaceholder />
                )}
              </button>
              <h2 className={styles.title}>{movie.Title}</h2>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.btnDiv}>
        <button className={styles.btnPages} onClick={handlePrevPage}>
          <FcLeft />
        </button>
        <button className={styles.btnPages} onClick={handleNextPage}>
          <FcRight />
        </button>
      </div>
    </div>
  );
}

export default connect(null, {
  addMovieFavorite,
  RemoveMovieFavorite,
})(Buscador);
