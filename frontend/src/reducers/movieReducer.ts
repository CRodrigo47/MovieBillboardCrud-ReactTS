import { Movie } from "../types/movie";

type State = Movie;

type Action =
  | { type: "CHANGE_TITLE"; payload: string }
  | { type: "CHANGE_YEAR"; payload: number }
  | { type: "CHANGE_RATING"; payload: number }
  | { type: "CHANGE_VOTES"; payload: number }
  | { type: "CHANGE_DIRECTOR"; payload: string }
  | { type: "CHANGE_PLOT"; payload: string }
  | { type: "CHANGE_GENRES"; payload: string[] }
  | { type: "CHANGE_POSTER"; payload: string }

  export const initialMovie: Movie = {
    _id: "", 
    title: "",
    year: 0,
    imdb: {
      rating: 0,
      votes: 0
    },
    director: "",
    plot: "",
    genres: [],
    poster: ""
  };

export const movieReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CHANGE_TITLE": {
        return { ...state, title: action.payload };
    }
    case "CHANGE_YEAR": {
      return {...state, year: action.payload}
    }
    case "CHANGE_RATING": {
      return {...state, imdb: {...state.imdb, rating: action.payload}}
    }
    case "CHANGE_VOTES": {
        return {...state, imdb: {...state.imdb, votes: action.payload}}
    }
    case "CHANGE_DIRECTOR": {
        return {...state, director: action.payload}
    }
    case "CHANGE_PLOT": {
        return {...state, plot: action.payload}
    }
    case "CHANGE_GENRES": {
        return {...state, genres: action.payload}
    }
    case "CHANGE_POSTER": {
        return {...state, poster: action.payload}
    }
    default:
        return state;
  }
};
