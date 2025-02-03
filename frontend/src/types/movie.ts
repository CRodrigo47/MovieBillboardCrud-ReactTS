export type Movie = { //Creo el tipo Movie para poder utilizarlo en la aplicacion.
  imdb: Imdb;
  _id: string;
  title: string;
  year: number;
  director: string;
  plot: string;
  genres: string[];
  poster: string;
};

type Imdb = {
  rating: number;
  votes: number;
};
