import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addMovieFavorite, RemoveMovieFavorite } from "../../actions/index";
import { useQuery } from "react-query";
import "./Movie.css";
import { Spinner } from "../Spinner/Spinner";
import axios from "axios";

export default function Movie() {
  const { id } = useParams();

  async function getMovieDetail(payload) {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=cc86a7d2&i=${payload}&plot=full`
      );
      return (payload = response.data);
    } catch (err) {
      console.error(err);
    }
  }

  const { data: movieDetail, isLoading } = useQuery(["movieDetails", id], () =>
    getMovieDetail(id)
  );

  const dispatch = useDispatch();

  const moviesFavourites = useSelector((state) => state.moviesFavourites);

  // React.useEffect(() => {
  //   dispatch(getMovieDetail(id));
  //   return () => {
  //     dispatch({ type: GET_MOVIE_DETAIL, payload: undefined });
  //   };
  // }, [dispatch, id]); // the returned dispatch will set the movieDetail state to undefined after the component is unmounted so there's nothing on the body before the loading process starts

  if (isLoading || !movieDetail) {
    console.log(movieDetail);
    return <Spinner />;
  }
  return (
    <div className="movie-detail">
      <div style={{ textAlign: "center" }}>
        <h1> Movie Details </h1>
      </div>
      <button
        className="button"
        style={{ margin: "0.5rem" }}
        onClick={() => {
          moviesFavourites?.find((m) => m.imdbID === id)
            ? dispatch(RemoveMovieFavorite(movieDetail))
            : dispatch(
                addMovieFavorite({
                  Title: movieDetail.Title,
                  Year: movieDetail.Year,
                  imdbID: id,
                  Type: movieDetail.Type,
                  Poster: movieDetail.Poster,
                })
              );
        }}
      >
        {moviesFavourites?.find((m) => m.imdbID === id) ? "Faved" : "Fav"}
      </button>
      <div
        className="details"
        style={{ display: "flex", alignContent: "center" }}
      >
        <div style={{ display: "inline-flex", padding: "1rem" }}>
          <img src={movieDetail.Poster} alt={movieDetail.Title} />
        </div>
        <ul>
          <li>
            {movieDetail.Title} <span>({movieDetail.Year})</span>
          </li>
          <li>Runtime: {movieDetail.Runtime}</li>
          <li>Genre: {movieDetail.Genre}</li>
          <li>Actors: {movieDetail.Actors}</li>
          <li>Metascore: {movieDetail.Metascore}</li>
          <li> IMDB rating: {movieDetail.imdbRating}</li>
          <li>
            {" "}
            <p>Plot:</p>
            {movieDetail.Plot}
          </li>
        </ul>
      </div>
    </div>
  );
}
