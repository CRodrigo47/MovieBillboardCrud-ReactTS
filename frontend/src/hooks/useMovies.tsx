import { useContext, useEffect, useMemo, useState } from "react";
import { getAllMovies } from "../services/movieService";
import { Movie } from "../types/movie";
import { MovieContext } from "../context/movieEdit";

type Props = {
  search: string;
  genreFilter: string;
};

export default function useMovies({ search, genreFilter }: Props) {
  const context = useContext(MovieContext);

  if (context === undefined) {
    throw new Error(
      "Intentas acceder a opciones del contexto fuera del provider."
    );
  }

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await getAllMovies();
      
      setMovies(result.status);
    };
    fetchMovies();
  }, []);

  const filteredMovies = useMemo(() => { //Evitamos que cada vez que se filtre la lista se tenga que recargar el componente con el useEffect.
    return movies.filter(
      (movie: Movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase()) &&
        (movie.genres.includes(genreFilter) || genreFilter === "all")
    );
  }, [movies, search, genreFilter]);

  return { movies: filteredMovies, context };
}
