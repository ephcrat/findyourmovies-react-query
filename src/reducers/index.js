import { ADD_MOVIE_FAVORITE, REMOVE_MOVIE_FAVORITE } from "../actions";

const initialState = {
  moviesFavourites: [],
  moviesLoaded: [],
  movieDetail: undefined,
  loading: false,
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_MOVIE_FAVORITE:
      return {
        ...state,
        moviesFavourites: state.moviesFavourites.concat(payload),
      };
    case REMOVE_MOVIE_FAVORITE:
      return {
        ...state,
        moviesFavourites: state.moviesFavourites.filter(
          (m) => m.imdbID !== payload.imdbID
        ),
      };
    default:
      return state;
  }
}
