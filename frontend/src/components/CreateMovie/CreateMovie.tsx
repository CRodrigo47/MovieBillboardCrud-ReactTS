import { useContext, useState } from "react";
import { MovieContext } from "../../context/movieEdit";
import useGenres from "../../hooks/useGenres";
import { addMovie } from "../../services/movieService";

export function CreateMovie() {
  const movieContext = useContext(MovieContext);
  const [selectedGenre, setSelectedGenre] = useState("");

  if (!movieContext) {
    throw new Error("Estas usando el MovieContext en el lugar equivocado");
  }

  const {
    movie,
    changeTitle,
    changeYear,
    changeRating,
    changeVotes,
    changeDirector,
    changePlot,
    changeGenres,
    changePoster,
  } = movieContext;

  const { genres } = useGenres();

  const addGenre = (genre: string) => {
    const genreToAdd = genre;
    changeGenres(genreToAdd);
  };

  const handleAddMovie = async () => {
    const newMovie = movie;
    const response = await addMovie(newMovie);
    console.log(response);
  };

  return (
    <>
      <div className="header">
        <h1>CREAR PELICULA</h1>
      </div>
      <div className="inputs">
        <p>Link del poster</p>
        <input type="text" onChange={changePoster} />
        <p>Titulo</p>
        <input type="text" onChange={changeTitle} />
        <p>Año</p>
        <input type="number" onChange={changeYear} />
        <p>Director</p>
        <input type="text" onChange={changeDirector} />
        <p>Plot</p>
        <input type="text" onChange={changePlot} />
        <p>Generos</p>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Selecciona un género</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button onClick={() => addGenre(selectedGenre)}>Añadir género</button>
        <div className="imdb">
          <p>Rating</p>
          <input type="number" onChange={changeRating} />
          <p>Votos</p>
          <input type="number" onChange={changeVotes} />
        </div>
        <button onClick={handleAddMovie}>SUBIR PELICULA</button>
      </div>

      <h1>PREVIEW DE LA PELICULA</h1>
      <div className="preview">
        <img src={movie.poster} alt={movie.title} style={{ width: "12em" }} />
        <h1>{movie.title}</h1>
        <h3>{movie.plot}</h3>
        {movie.year > 0 ? <h5>{movie.year}</h5> : <></>}
        <h5>{movie.director}</h5>
        <div>
          <section>
            {movie.genres.map(
              (
                g //Recorremos el array de generos y dotamos el parrafo con una key unica (En este caso, el nombre del genero.)
              ) => (
                <p key={g}>{g}</p>
              )
            )}
          </section>
          <p>{movie.imdb.rating}</p>
          <p>{movie.imdb.votes}</p>
        </div>
      </div>
    </>
  );
}
