import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/movieEdit";
import { Movie } from "../types/movie";
import { getSingleMovie } from "../services/movieService";


type Props = {
    id: string
}

export default function useMovie({id}: Props){
    const editMovieTools = useContext(MovieContext);

    if (editMovieTools === undefined) {
      throw new Error(
        "Intentas acceder a opciones del contexto fuera del provider."
      );
    }

    const [movie, setMovie] = useState<Movie>()

    useEffect(() => {
        const fetchMovie = async () => {
            const result = await getSingleMovie(id)

            setMovie(result.status)
        }
        fetchMovie()
    },[id])

    return {movie, editMovieTools}

}