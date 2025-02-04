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

  if (!pageContext) {
    throw new Error("No estas usando el contexto donde toca.");
  }

  const { currentPage } = pageContext;

  return (
    <MovieEditProvider>
      <div className="app">
        <Header />
        {currentPage === 0 ? <MovieList /> : <></>}
        {currentPage === 1 ? <CreateMovie /> : <></>}
        {currentPage === 2 ? <SelectedMovie /> : <></>}
      </div>
    </MovieEditProvider>
  );
}

export default App;
