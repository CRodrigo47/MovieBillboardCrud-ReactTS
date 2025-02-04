/* eslint-disable react-refresh/only-export-components */
import { ChangeEvent, createContext, ReactNode, useReducer } from "react";
import { initialMovie, movieReducer } from "../reducers/movieReducer";
import { Movie } from "../types/movie";

type MovieContextType = {
  movie: Movie;
  changeTitle: (title: ChangeEvent<HTMLInputElement>) => void;
  changeYear: (year: ChangeEvent<HTMLInputElement>) => void;
  changeRating: (rating: ChangeEvent<HTMLInputElement>) => void;
  changeVotes: (rating: ChangeEvent<HTMLInputElement>) => void;
  changeDirector: (director: ChangeEvent<HTMLInputElement>) => void;
  changePlot: (plot: ChangeEvent<HTMLInputElement>) => void;
  addGenre: (genres: string) => void;
  removeGenre: (genres: string) => void;
  changePoster: (poster: ChangeEvent<HTMLInputElement>) => void;
  resetMovie: () => void;
  movieToEdit: (movie: Movie) => void;
};

export const MovieContext = createContext<MovieContextType | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export function MovieEditProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(movieReducer, initialMovie);

  const changeTitle = (title: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: "CHANGE_TITLE",
      payload: title,
    });

  const changeYear = (year: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: "CHANGE_YEAR",
      payload: year,
    });

  const changeRating = (rating: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: "CHANGE_RATING",
      payload: rating,
    });

  const changeVotes = (votes: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: "CHANGE_VOTES",
      payload: votes,
    });

  const changeDirector = (director: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: "CHANGE_DIRECTOR",
      payload: director,
    });

  const changePlot = (plot: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: "CHANGE_PLOT",
      payload: plot,
    });

  const addGenre = (genres: string) =>
    dispatch({
      type: "ADD_GENRE",
      payload: genres,
    });

  const removeGenre = (genres: string) =>
    dispatch({
      type: "REMOVE_GENRE",
      payload: genres,
    });

  const changePoster = (poster: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: "CHANGE_POSTER",
      payload: poster,
    });

  const resetMovie = () =>
    dispatch({
      type: "RESET_MOVIE",
    });

  const movieToEdit = (movie: Movie) =>
    dispatch({
      type: "MOVIE_TO_EDIT",
      payload: movie,
    });

  return (
    <MovieContext.Provider
      value={{
        movie: state,
        changeTitle,
        changeYear,
        changeRating,
        changeVotes,
        changeDirector,
        changePlot,
        addGenre,
        removeGenre,
        changePoster,
        resetMovie,
        movieToEdit,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
