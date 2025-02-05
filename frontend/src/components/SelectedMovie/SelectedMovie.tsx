import { ChangeEvent, useContext, useState } from "react";
import { CurrentPageContext } from "../../context/currentPage";
import useMovie from "../../hooks/useMovie";
import useGenres from "../../hooks/useGenres";
import { editMovie } from "../../services/movieService";
import "./SelectedMovie.css";

export function SelectedMovie() {
  const pageContext = useContext(CurrentPageContext);
  //Llamamos al contexto de page context para poder controler en que pagina estamos y cambiar entre componentes

  if (!pageContext) {
    throw new Error("No estas usando el contexto en el lugar correcto.");
  }

  //Sacamos el moviePayload para saber el id de la pelicula seleccionada y moveToList para volver a la lista de peliculas una vez la actualizamos.
  //Luego, sacamos la pelicula con el Payload y el contexto para editar la pelicula.
  //Tambien sacamos todos los generos para varias operaciones.
  const { moviePayload, moveToList } = pageContext; 
  const { selectedMovie, editMovieTools } = useMovie({ id: moviePayload });
  const { genres } = useGenres();

  //Estado del genero seleccionado para ir introduciendolo en los generos de la pelicula.
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  //Funcion para introducir el genero al estado de genero seleccionado
  const handleSelectedGenres = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  //Funcion para introducir el genero al estado global de pelicula
  const addGenres = () => {
    const genresToAdd = selectedGenre;
    if (movie.genres.includes(genresToAdd)) {
      return console.error("No puedes añadir un genero ya existente.");
    }
    addGenre(genresToAdd);
    setSelectedGenre("");
  };

  //Funcion para actualizar la pelicula en la API
  const handleUpdateMovie = async () => {
    const newMovie = movie;
    const response = await editMovie(newMovie);
    console.log(response);
    moveToList();
  };

  //Todo lo que sacamos del contexto de la pelicula
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
  } = editMovieTools;

  //Un loader bien chulo mientras carga la pelicula!
  if (!selectedMovie) {
    return(
      <div className="loader-container">
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }
  return (
    <div className="edit-movie-container">
      <div className="header">
        <h1>Editar pelicula</h1>
      </div>
      <div className="form-inputs">
        <img src={movie.poster} alt={movie.title} style={{ width: "12em" }} />
        <input type="text" onChange={changePoster} value={movie.poster} />
        <input type="text" onChange={changeTitle} value={movie.title} />
        <input type="number" onChange={changeYear} value={movie.year} />
        <input type="text" onChange={changeDirector} value={movie.director} />
        <textarea onChange={changePlot} value={movie.plot} className="form-plot" />
        <div className="genres-container">
          <select
            value={selectedGenre}
            onChange={(e) => handleSelectedGenres(e)}
          >
            <option value="">Selecciona un género</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <button onClick={addGenres}>Añadir género</button>
          <section className="genres-section">
            {movie.genres.map(
              (
                g //Recorremos el array de generos y dotamos el parrafo con una key unica (En este caso, el nombre del genero.)
              ) => (
                <div key={g} className="single-genre">
                  <p>{g}</p>
                  <button onClick={() => removeGenre(g)}>
                    Eliminar genero
                  </button>
                </div>
              )
            )}
          </section>
        </div>

        <div className="imdb">
          <p>IMDB</p>
          <input
            type="number"
            onChange={changeRating}
            value={movie.imdb.rating}
          />
          <input
            type="number"
            onChange={changeVotes}
            value={movie.imdb.votes}
          />
        </div>
        <button onClick={handleUpdateMovie} className="form-button">ACTUALIZAR PELICULA</button>
      </div>
    </div>
  );
}
