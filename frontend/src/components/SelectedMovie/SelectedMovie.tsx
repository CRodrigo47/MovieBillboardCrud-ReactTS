import { useContext, useState } from "react";
import { CurrentPageContext } from "../../context/currentPage";
import useMovie from "../../hooks/useMovie";

export function SelectedMovie() {
  const pageContext = useContext(CurrentPageContext)

  if(!pageContext){
    throw new Error("No estas usando el contexto en el lugar correcto.")
  }

  const {moviePayload} = pageContext
  const {movie, editMovieTools} = useMovie({id: moviePayload})
  const [editMode, setEditMode] = useState(false)

  return (
    <>
      <h1>{movie?.title}</h1>
    </>
  );
}
