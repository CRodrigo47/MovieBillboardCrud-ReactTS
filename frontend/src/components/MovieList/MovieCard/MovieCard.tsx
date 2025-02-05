import { useContext } from "react";
import { Movie } from "../../../types/movie";
import { CurrentPageContext } from "../../../context/currentPage";
import "./MovieCard.css";
import { deleteMovie } from "../../../services/movieService";

type Props = {
  movie: Movie;
};

export function MovieCard({ movie }: Props) {
  const pageContext = useContext(CurrentPageContext);
  //Llamamos al contexto de page context para poder controler en que pagina estamos y cambiar entre componentes

  if (!pageContext) {
    throw new Error("Estas usando el pageContext en el lugar equivocado.");
  }

  //Sacamos el moveToEdit para poder editar una pelicula dandole click
  const { moveToEdit } = pageContext;

  //Funcion para eliminar la pelicula desde la card
  const handleDelete = async () => {
    const idMovie = movie._id
    const response = await deleteMovie(idMovie)
    console.log(response)
  }

  return (
    <div className="card-container">
     <div className="card" onClick={() => moveToEdit(movie._id)}>
      <img src={movie.poster} alt={movie.title} className="card-poster" />
      <div className="card-data">
      <h4 className="card-title">{movie.title}</h4>
      <h4 className="card-year">{movie.year}</h4>
      </div>
    </div>
    <button onClick={handleDelete}>Eliminar pelicula</button>
    </div>

  );
}
