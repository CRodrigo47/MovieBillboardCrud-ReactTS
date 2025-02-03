import { useContext } from "react";
import { CurrentPageContext } from "../../context/currentPage";


export function Header() {
  const pageContext = useContext(CurrentPageContext)

  if(!pageContext){
    throw new Error("Estas usando el pageContext en el lugar equivocado.")
  }

  const {moveToList, moveToCreate} = pageContext

  return (
    <header>
      <h1 className="header-title">MOVIE BILLBOARD</h1>
      <div className="section-list">
        <button onClick={moveToList}>
          Lista de peliculas
        </button>
        <button onClick={moveToCreate}>
          Crear pelicula
        </button>
      </div>
    </header>
  );
}
