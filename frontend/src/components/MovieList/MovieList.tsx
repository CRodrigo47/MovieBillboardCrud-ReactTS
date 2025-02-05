import React, { useState } from "react";
import { Movie } from "../../types/movie";
import useMovies from "../../hooks/useMovies";
import useGenres from "../../hooks/useGenres";
import { MovieCard } from "./MovieCard/MovieCard";
import "./MovieList.css";

export function MovieList() {
  const [genreFilter, setGenresFilter] = useState("all"); //Filtros de generos para pasarselos al useMovies
  const [search, setSearch] = useState(""); //Filtro de busqueda
  const { movies } = useMovies({ search, genreFilter }); //Generamos las peliculas del custom hook
  const { genres } = useGenres(); //Generamos los generos del custom hook

  //Cambiamos los generos filtrados para poder filtrar las pelis
  const handleGenreFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filteredGenres = event.target.value;
    setGenresFilter(filteredGenres);
  };

  //Cambiamos el filtro del input para poder filtrar por texto
  const handleSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredSearch = event.target.value;
    setSearch(filteredSearch);
  };

  //Un loader bien chulo
  if(!movies){
    return(
      <div className="loader-container">
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  return (
    <>
      <div className="movie-list-container">
        <div className="filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar..."
              onChange={(e) => handleSearchFilter(e)}
            />
          </div>
          <div className="category-bar">
            <select name="categories" onChange={(e) => handleGenreFilter(e)}>
              <option value="all">Todos</option>
              {genres.map((genre: string) => (
                <option value={genre} key={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="movie-list-cards">
          {movies.map((movie: Movie) => (
            <div key={movie._id} className="movie-card">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
