import { useContext } from "react";
import { CurrentPageContext } from "../../context/currentPage";
import { MovieContext } from "../../context/movieEdit";
import "./Header.css"


export function Header() {
  const pageContext = useContext(CurrentPageContext)
  const movieContext = useContext(MovieContext)

  if(!pageContext){
    throw new Error("Estas usando el pageContext en el lugar equivocado.")
  }

  if(!movieContext){
    throw new Error("Estas usando el movieContext en el lugar equivocado.")
  }

  const {moveToList, moveToCreate} = pageContext
  const {resetMovie} = movieContext

  const changeToList = () =>{
    moveToList()
    resetMovie()
  }

  const changeToCreate = () => {
    moveToCreate()
    resetMovie()
  }

  return (
    <header>
      <h1>Cartelera</h1>
      <div className="section-list">
        <button onClick={changeToList} className="nav-button">
          Lista de peliculas
        </button>
        <button onClick={changeToCreate} className="nav-button">
          Crear pelicula
        </button>
      </div>
    </header>
  );
}
