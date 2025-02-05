import { useEffect, useMemo, useState } from "react";
import { getAllMovies } from "../services/movieService";
import { Movie } from "../types/movie";

type Props = { //Pasamos los filtros como props
  search: string;
  genreFilter: string;
};

export default function useMovies({ search, genreFilter }: Props) {


  const [movies, setMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    //Fetch de movies para poder guardar la lista de peliculas en el estado movies
    const fetchMovies = async () => {
      const result = await getAllMovies();

      setMovies(result.status);
    };
    fetchMovies();
  }, [movies]);

  const filteredMovies = useMemo(() => {
    //Creamos el estado filteredMovies para poder filtrar las peliculas que nos llegan
    //Evitamos que cada vez que se filtre la lista se tenga que recargar el componente con el useEffect.
    return movies?.filter(
      (movie: Movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase()) &&
        (movie.genres.includes(genreFilter) || genreFilter === "all")
    );
  },
  //Usamos estas dependencias para que no se recargue el componente cada vez que cambia el search y el resultado es el mismo
   [movies, search, genreFilter]);
  
  return { movies: filteredMovies };
}
