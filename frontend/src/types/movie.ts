export type Movie = {
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
