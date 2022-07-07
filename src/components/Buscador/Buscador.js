import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useSearchParams, createSearchParams } from "react-router-dom";
import "./Buscador.css";
import { addMovieFavorite, RemoveMovieFavorite } from "../../actions";
import { useQuery } from "react-query";

export function Buscador({ addMovieFavorite, RemoveMovieFavorite }) {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [page, setPage] = useState(1);
  const search = searchParams.get("search");
  const API_KEY = "cc86a7d2";

  async function getMovies(titulo, page = 1) {
    if (titulo.length >= 3)
      return fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${titulo}&type=movie&page=${page}`
      ).then((response) =>
        response.json().then((json) => {
          return json.Search;
        })
      );
  }

  const { data: movies, isLoading } = useQuery(
    ["movies", search, page],
    () => search && getMovies(search, page)
  );

  const moviesFavourites = useSelector((state) => state.moviesFavourites);

  function handleChange(event) {
    event.preventDefault();
    console.log(searchParams);
    event.target.value
      ? setSearchParams(
          createSearchParams({ search: event.target.value, page: page })
        )
      : removeQueryParams();
  }
  function handleSubmit(event) {
    event.preventDefault();
  }

  console.log(page);
  function handleNextPage() {
    if (movies) {
      setPage(page + 1);
      setSearchParams(createSearchParams({ search: search, page: page + 1 }));
    }
    return;
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
    <div>
      <h2>Find a Movie</h2>
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="label" htmlFor="title">
            Movie Title:{" "}
          </label>
          <input
            type="text"
            id="title"
            autoComplete="off"
            value={search ?? ""}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button onClick={removeQueryParams}>CLEAR</button>
      </form>
      <button onClick={handlePrevPage}>Previous Page</button>
      <button onClick={handleNextPage}>Next Page</button>
      <ul>
        {movies?.map((movie) => (
          <li key={movie.imdbID}>
            <Link className="link" to={`/movie/${movie.imdbID}`}>
              {movie.Title}
            </Link>
            <button
              className="button"
              style={{ margin: "0.5rem" }}
              onClick={() => {
                moviesFavourites?.find((m) => m.imdbID === movie.imdbID)
                  ? RemoveMovieFavorite(movie)
                  : addMovieFavorite(movie);
              }}
            >
              {moviesFavourites?.find((m) => m.imdbID === movie.imdbID)
                ? "Faved"
                : "Fav"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default connect(null, {
  addMovieFavorite,
  RemoveMovieFavorite,
})(Buscador);
