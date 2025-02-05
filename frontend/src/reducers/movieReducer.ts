import { ChangeEvent } from "react";
import { Movie } from "../types/movie";

type State = Movie; //Se crea un estado tipo Movie para poder controlarla en el reducer

type Action = //Se crean las acciones que va a tener el reducer (Para poder editar el estado de la pelicula)

    | { type: "CHANGE_TITLE"; payload: ChangeEvent<HTMLInputElement> }
    | { type: "CHANGE_YEAR"; payload: ChangeEvent<HTMLInputElement> }
    | { type: "CHANGE_RATING"; payload: ChangeEvent<HTMLInputElement> }
    | { type: "CHANGE_VOTES"; payload: ChangeEvent<HTMLInputElement> }
    | { type: "CHANGE_DIRECTOR"; payload: ChangeEvent<HTMLInputElement> }
    | { type: "CHANGE_PLOT"; payload: ChangeEvent<HTMLTextAreaElement> }
    | { type: "ADD_GENRE"; payload: string }
    | { type: "REMOVE_GENRE"; payload: string }
    | { type: "CHANGE_POSTER"; payload: ChangeEvent<HTMLInputElement> }
    | { type: "RESET_MOVIE"}
    | { type: "MOVIE_TO_EDIT"; payload: Movie };

export const initialMovie: Movie = {
  //Se crea un estado inicial para poder editar a lo largo del reducer
  _id: "",
  title: "",
  year: 0,
  imdb: {
    rating: 0,
    votes: 0,
  },
  director: "",
  plot: "",
  genres: [],
  poster: "",
};

export const movieReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CHANGE_TITLE": {
      return { ...state, title: action.payload.target.value };
    }
    case "CHANGE_YEAR": {
      return { ...state, year: Number(action.payload.target.value) };
    }
    case "CHANGE_RATING": {
      return {
        ...state,
        imdb: { ...state.imdb, rating: Number(action.payload.target.value) },
      };
    }
    case "CHANGE_VOTES": {
      return {
        ...state,
        imdb: { ...state.imdb, votes: Number(action.payload.target.value) },
      };
    }
    case "CHANGE_DIRECTOR": {
      return { ...state, director: action.payload.target.value };
    }
    case "CHANGE_PLOT": {
      return { ...state, plot: action.payload.target.value };
    }
    case "ADD_GENRE": {
      return { ...state, genres: [...state.genres, action.payload] };
    }
    case "REMOVE_GENRE": {
      return { ...state, genres: state.genres.filter(g => g!==action.payload) };
    }
    case "CHANGE_POSTER": {
      return { ...state, poster: action.payload.target.value };
    }
    case "RESET_MOVIE": {
      return {...initialMovie}
    }
    case "MOVIE_TO_EDIT": {
      return action.payload
    }
    default:
      return state;
  }
};
