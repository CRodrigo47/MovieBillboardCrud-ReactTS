import { ChangeEvent, useContext, useState } from "react";
import { CurrentPageContext } from "../../context/currentPage";
import useMovie from "../../hooks/useMovie";
import useGenres from "../../hooks/useGenres";
import { editMovie } from "../../services/movieService";

export function SelectedMovie() {
  const pageContext = useContext(CurrentPageContext);

  if (!pageContext) {
    throw new Error("No estas usando el contexto en el lugar correcto.");
  }

  const { moviePayload, moveToList } = pageContext;
  const { selectedMovie, editMovieTools } = useMovie({ id: moviePayload });
  const { genres } = useGenres();

  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const handleSelectedGenres = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value)
  }

  const addGenres = () =>{
    const genresToAdd = selectedGenre
    if(movie.genres.includes(genresToAdd)){
      return console.error("No puedes añadir un genero ya existente.")
    }
    addGenre(genresToAdd)
    setSelectedGenre("")
  }

  const handleUpdateMovie = async () => {
    const newMovie = movie;
    const response = await editMovie(newMovie);
    console.log(response);
    moveToList()

  };

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

  if (!selectedMovie) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <div className="header">
        <h1>EDITAR PELICULA</h1>
      </div>
      <div className="inputs">
      <img src={movie.poster} alt={movie.title} style={{ width: "12em" }} />
        <input type="text" onChange={changePoster} value={movie.poster}/>
        <input type="text" onChange={changeTitle} value={movie.title}/>
        <input type="number" onChange={changeYear} value={movie.year}/>
        <input type="text" onChange={changeDirector} value={movie.director}/>
        <input type="text" onChange={changePlot} value={movie.plot}/>
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
        <section>
            {movie.genres.map(
              (
                g //Recorremos el array de generos y dotamos el parrafo con una key unica (En este caso, el nombre del genero.)
              ) => (
                <div key={g}>
                  <p>{g}</p>
                  <button onClick={() => removeGenre(g)}>eliminar genero</button>
                  </div>
              )
            )}
          </section>
        <div className="imdb">
          <input type="number" onChange={changeRating} value={movie.imdb.rating}/>
          <input type="number" onChange={changeVotes} value={movie.imdb.votes} />
        </div>
        <button onClick={handleUpdateMovie}>ACTUALIZAR PELICULA</button>
      </div>
    </>
  );
}
