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
  changeGenres: (genres: string) => void;
  changePoster: (poster: ChangeEvent<HTMLInputElement>) => void;
};


export const MovieContext = createContext<MovieContextType | null>(
  null
);

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

  const changeGenres = (genres: string) =>
    dispatch({
      type: "CHANGE_GENRES",
      payload: genres,
    });

  const changePoster = (poster: ChangeEvent<HTMLInputElement>) =>
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
