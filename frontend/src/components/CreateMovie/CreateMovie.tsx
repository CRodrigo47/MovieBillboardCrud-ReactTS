import { useContext, useState } from "react";
import { MovieContext } from "../../context/movieEdit";
import useGenres from "../../hooks/useGenres";
import { addMovie } from "../../services/movieService";
import { CurrentPageContext } from "../../context/currentPage";
import "./CreateMovie.css";

export function CreateMovie() {
  const movieContext = useContext(MovieContext);
  //Llamamos al contexto de pelicula
  const [selectedGenre, setSelectedGenre] = useState("");
  const currentPageContext = useContext(CurrentPageContext);
  //Llamamos al contexto de page context para poder controler en que pagina estamos y cambiar entre componentes

  if (!movieContext) {
    throw new Error("Estas usando el MovieContext en el lugar equivocado");
  }

  if (!currentPageContext) {
    throw new Error(
      "Estas usando el CurrentPageContext en el lugar equivocado"
    );
  }

  const { moveToList } = currentPageContext; //Para movernos a la lista de peliculas una vez hemos terminado de crear una pelicula

  const {
    movie,
    changeTitle,
    changeYear,
    changeRating,
    changeVotes,
    changeDirector,
    changePlot,
    addGenre,
    removeGenre,
    changePoster,
  } = movieContext;

  const { genres } = useGenres();

  //Funcion para introducir el genero al estado global de pelicula
  //Además, validamos que no es un genero ya introducido y si no lo selecciona vacio.
  const addGenreToState = () => {
    const genreToAdd = selectedGenre;
    if (movie.genres.includes(genreToAdd)) {
      return console.error("No puedes añadir un genero ya existente.");
    }
    if (genreToAdd === "" || genreToAdd === "Selecciona un género") {
      return console.error("Debes seleccionar un género.");
    }
    addGenre(genreToAdd);
    setSelectedGenre("");
  };

  //Funcion para introducir la pelicula una vez esté creada
  const handleAddMovie = async () => {
    const newMovie = movie;
    const response = await addMovie(newMovie);
    console.log(response);
    moveToList();
  };

  return (
    <div className="component-container">
      <div className="header">
        <h1>Crear pelicula</h1>
      </div>
      <div className="create-container">
        <div className="form-inputs">
          <p>Link del poster</p>
          <input type="text" onChange={changePoster} />
          <p>Titulo</p>
          <input type="text" onChange={changeTitle} />
          <p>Año</p>
          <input type="number" onChange={changeYear} />
          <p>Director</p>
          <input type="text" onChange={changeDirector} />
          <p>Plot</p>
          <textarea
            onChange={changePlot}
            value={movie.plot}
            className="form-plot"
          />
          <div className="genres-container">
            {/* El select indica el valor que tenemos seleccionado en la lista de opciones. Al cambiarlo, cambiamos el estado de selectedGenre para usarlo mas adelante */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option>Selecciona un género</option>
              {/* Las option son las diferentes opciones del elemento Select. Aqui pongo uno base para seleccionar un genero y luego pongo el resto de generos en un bucle. */}
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <button onClick={addGenreToState}>Añadir género</button>
          </div>

          <div className="imdb-create">
            <div className="rating-create">
              <p>Rating</p>
              <input type="number" onChange={changeRating} />
            </div>
            <div className="votes-create">
              <p>Votos</p>
              <input type="number" onChange={changeVotes} />
            </div>
          </div>
          <button onClick={handleAddMovie} className="form-button">
            Subir pelicula
          </button>
        </div>

              {/* Aqui mostraremos la preview de lo que está poniendo el usuario. */}
        <div className="preview">
          <h1>Preview de la pelicula</h1>
          <img src={movie.poster} alt={movie.title} style={{ width: "15em" }} />
          <h1>{movie.title}</h1>
          {movie.year > 0 ? <h4>{movie.year}</h4> : <></>}
          <h4>{movie.director}</h4>
          <h4 className="create-plot">{movie.plot}</h4>
          <div>
            <section className="genres-section-create">
              {movie.genres.map(
                (
                  g //Recorremos el array de generos y dotamos el parrafo con una key unica (En este caso, el nombre del genero.)
                ) => (
                  <div key={g} className="single-genre-create">
                    <p>{g}</p>
                    <button onClick={() => removeGenre(g)}>
                      Eliminar género
                    </button>
                  </div>
                )
              )}
            </section>
            {movie.imdb.rating > 0 ? <p>{movie.imdb.rating}</p> : <></>}
            {movie.imdb.votes > 0 ? <p>{movie.imdb.votes}</p> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
}
