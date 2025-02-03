import React, { useState } from "react";
import { Movie } from "../../types/movie";
import useMovies from "../../hooks/useMovies";
import useGenres from "../../hooks/useGenres";
import { MovieCard } from "./MovieCard/MovieCard";
import "./MovieList.css";

export function MovieList() {
  const [genreFilter, setGenresFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { movies } = useMovies({ search, genreFilter });
  const { genres } = useGenres();

  const handleGenreFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filteredGenres = event.target.value;
    setGenresFilter(filteredGenres);
  };

  const handleSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredSearch = event.target.value;
    setSearch(filteredSearch);
  };

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
            <label>Genero</label>
            <select name="categories" onChange={(e) => handleGenreFilter(e)}>
              <option value="all">Todas</option>
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
            <div key={movie._id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
