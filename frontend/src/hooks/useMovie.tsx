import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/movieEdit";
import { Movie } from "../types/movie";
import { getSingleMovie } from "../services/movieService";


type Props = {
    id: string
}

export default function useMovie({id}: Props){
    const editMovieTools = useContext(MovieContext);

    if (!editMovieTools) {
      throw new Error(
        "Intentas acceder a opciones del contexto fuera del provider."
      );
    }

    const {movieToEdit} = editMovieTools
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

    useEffect(() => {
        const fetchMovie = async () => {
            const result = await getSingleMovie(id)

            setSelectedMovie(result.status)
        }
        fetchMovie()
    },[id])

    useEffect(() => {
      if (selectedMovie) {
        movieToEdit(selectedMovie);
      }
    }, [selectedMovie]);

   

    return {selectedMovie, editMovieTools}

}