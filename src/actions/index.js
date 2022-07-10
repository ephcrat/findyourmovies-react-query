export const ADD_MOVIE_FAVORITE = "add movie favorite";
export const REMOVE_MOVIE_FAVORITE = "remove movie favorite";

export function addMovieFavorite(payload) {
  return { type: ADD_MOVIE_FAVORITE, payload };
}

export function RemoveMovieFavorite(payload) {
  return { type: REMOVE_MOVIE_FAVORITE, payload };
}
