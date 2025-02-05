/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/movieEdit";
import { Movie } from "../types/movie";
import { getSingleMovie } from "../services/movieService";


type Props = {
    id: string
}

export default function useMovie({id}: Props){
    const editMovieTools = useContext(MovieContext);
    //Pillamos el contexto para poder usarlo para cambiar el estado de la pelicula global y pasarlo como tal y acceder a las opciones del estado.

    if (!editMovieTools) {
      throw new Error(
        "Intentas acceder a opciones del contexto fuera del provider."
      );
    }

    const {movieToEdit} = editMovieTools
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

    useEffect(() => {
      //Pillamos 1 sola pelicula
        const fetchMovie = async () => {
            const result = await getSingleMovie(id)

            setSelectedMovie(result.status)
        }
        fetchMovie()
    },[id])

    useEffect(() => {
      //Con esto editamos el estado global para que sea la pelicula seleccionada por el usuario.
      if (selectedMovie) {
        movieToEdit(selectedMovie);
      }
    }, [selectedMovie]);

   

    return {selectedMovie, editMovieTools}

}