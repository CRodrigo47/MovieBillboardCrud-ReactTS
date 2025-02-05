import { useContext } from "react";
import { CurrentPageContext } from "../../context/currentPage";
import { MovieContext } from "../../context/movieEdit";
import "./Header.css"


export function Header() {
  const pageContext = useContext(CurrentPageContext)
  //Llamamos al contexto de page context para poder controler en que pagina estamos y cambiar entre componentes
  const movieContext = useContext(MovieContext)
  //Y el contexto movie para poder resetear las peliculas conforme navegamos por la app

  if(!pageContext){
    throw new Error("Estas usando el pageContext en el lugar equivocado.")
  }

  if(!movieContext){
    throw new Error("Estas usando el movieContext en el lugar equivocado.")
  }

  //Funciones para moverte por la aplicacion
  const {moveToList, moveToCreate} = pageContext
  //Funcion para resetear el estado global de pelicula.
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
