import "./App.css";
import { Header } from "./components/Header/Header";
import { MovieList } from "./components/MovieList/MovieList";
import { CreateMovie } from "./components/CreateMovie/CreateMovie";
import { MovieEditProvider } from "./context/movieEdit";
import { useContext } from "react";
import { CurrentPageContext } from "./context/currentPage";
import { SelectedMovie } from "./components/SelectedMovie/SelectedMovie";

function App() {
  const pageContext = useContext(CurrentPageContext);
   //Llamamos al contexto de page context para poder controler en que pagina estamos y cambiar entre componentes

  if (!pageContext) {
    throw new Error("No estas usando el contexto donde toca.");
  }

  const { currentPage } = pageContext; //Sacamos solo la pagina, que es lo unico que vamos a comprobar

  return (
    <MovieEditProvider>
      {/* Englobamos todos los componentes con el provider del MovieEdit para poder editar el estado global de peliculas y acceder a sus controles del reducer */}
        <Header />
        {currentPage === 0 ? <MovieList /> : <></>}
        {currentPage === 1 ? <CreateMovie /> : <></>}
        {currentPage === 2 ? <SelectedMovie /> : <></>}
    </MovieEditProvider>
  );
}

export default App;
