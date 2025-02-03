/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useReducer } from "react";
import { initialMovie, movieReducer } from "../reducers/movieReducer";
import { Movie } from "../types/movie";

type MovieContextType = {
  movie: Movie;
  changeTitle: (title: string) => void;
  changeYear: (year: number) => void;
  changeRating: (rating: number) => void;
  changeVotes: (rating: number) => void;
  changeDirector: (director: string) => void;
  changePlot: (plot: string) => void;
  changeGenres: (genres: string[]) => void;
  changePoster: (poster: string) => void;
};


export const MovieContext = createContext<MovieContextType | null>(
  null
);

type ProviderProps = {
  children: ReactNode;
};

export function MovieEditProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(movieReducer, initialMovie);

  const changeTitle = (title: string) =>
    dispatch({
      type: "CHANGE_TITLE",
      payload: title,
    });

  const changeYear = (year: number) =>
    dispatch({
      type: "CHANGE_YEAR",
      payload: year,
    });

  const changeRating = (rating: number) =>
    dispatch({
      type: "CHANGE_RATING",
      payload: rating,
    });

  const changeVotes = (votes: number) =>
    dispatch({
      type: "CHANGE_VOTES",
      payload: votes,
    });

  const changeDirector = (director: string) =>
    dispatch({
      type: "CHANGE_DIRECTOR",
      payload: director,
    });

  const changePlot = (plot: string) =>
    dispatch({
      type: "CHANGE_PLOT",
      payload: plot,
    });

  const changeGenres = (genres: string[]) =>
    dispatch({
      type: "CHANGE_GENRES",
      payload: genres,
    });

  const changePoster = (poster: string) =>
    dispatch({
      type: "CHANGE_POSTER",
      payload: poster,
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
        changeGenres,
        changePoster,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
