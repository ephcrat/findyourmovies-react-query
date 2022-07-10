import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addMovieFavorite, RemoveMovieFavorite } from "../../actions/index";
import { useQuery } from "react-query";
import "./Movie.css";
import { Spinner } from "../Spinner/Spinner";
import axios from "axios";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

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
    <div className="wrapper">
      <div className="movie-detail">
        <div
          className="movie-card"
          style={{ display: "flex", alignContent: "center" }}
        >
          <div className="img">
            <img src={movieDetail.Poster} alt={movieDetail.Title} />
          </div>
          <ul>
            <li className="title">
              {movieDetail.Title} <span>({movieDetail.Year})</span>
            </li>

            <li className="imdb">
              IMDb Rating <br /> <span>{movieDetail.imdbRating}/10</span>
            </li>
            <div className="asd">
              <li>
                <span>Like</span> <br />{" "}
                <button
                  style={{ width: "2rem" }}
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
                  {moviesFavourites?.find((m) => m.imdbID === id) ? (
                    <FcLike />
                  ) : (
                    <FcLikePlaceholder />
                  )}
                </button>
              </li>
              <li>
                <span>Runtime</span> <br /> {movieDetail.Runtime}
              </li>
              <li>
                <span> Genre</span> <br /> {movieDetail.Genre}
              </li>
              <li>
                <span>Actors</span> <br /> {movieDetail.Actors}
              </li>
            </div>

            <li className="description">{movieDetail.Plot}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
