import { useContext } from "react";
import { Movie } from "../../../types/movie";
import { CurrentPageContext } from "../../../context/currentPage";
import "./MovieCard.css";

type Props = {
  movie: Movie;
};

export function MovieCard({ movie }: Props) {
  const pageContext = useContext(CurrentPageContext);

  if (!pageContext) {
    throw new Error("Estas usando el pageContext en el lugar equivocado.");
  }

  const { moveToEdit } = pageContext;

  return (
    <div className="card" onClick={() => moveToEdit(movie._id)}>
      <img src={movie.poster} alt={movie.title} className="card-poster" />
      <h1 className="card-title">{movie.title}</h1>
      <h4 className="card-year">{movie.year}</h4>
    </div>
  );
}
