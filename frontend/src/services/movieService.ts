import { BASE_URL } from "../constants/moviesAPI";
import { Movie } from "../types/movie";

const getAllMovies = async () => {
  //Funcion para coger todas las peliculas
  try {
    const response = await fetch(BASE_URL, { method: "GET" });

    if (!response.ok) {
      throw new Error("Error al cargar las peliculas");
    }

    const result = response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

const getSingleMovie = async (id: string) => {
  //Funcion para coger una sola pelicula. La usaremos en el SelectedMovie con el payload de currentPage.
  try {
    const response = await fetch(BASE_URL + "movie/" + id, { method: "GET"})
    
    if(!response.ok){
      throw new Error("Error al cargar una sola pelicula")
    }

    const result = response.json()
    return result
  } catch (err){
    console.error(err)
  }
}

const addMovie = async (movie: Movie) => {
  //Funcion para añadir una pelicula
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        imdb: movie.imdb,
        title: movie.title,
        year: movie.year,
        director: movie.director,
        plot: movie.plot,
        genres: movie.genres,
        poster: movie.poster,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al crear la pelicula");
    }

    const result = await response.json();

    return result;
  } catch (err) {
    console.error("Error: " + err);
  }
};

const editMovie = async (movie: Movie) => {
  //Funcion para editar una pelicula
  try {
    const response = await fetch(BASE_URL + movie._id, {
      method: "PUT",
      body: JSON.stringify({
        imdb: movie.imdb,
        title: movie.title,
        year: movie.year,
        director: movie.director,
        plot: movie.plot,
        genres: movie.genres,
        poster: movie.poster,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la pelicula");
    }

    const result = await response.json();

    return result;
  } catch (err) {
    console.error(err);
  }
};

const deleteMovie = async (id: string) => {
  //Funcion para eliminar una pelicula
  try {
    const response = await fetch(BASE_URL + id, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la pelicula");
    }

    const result = await response.json();

    return result;
  } catch (err) {
    console.error(err);
  }
};

const getAllGenres = async () => {
  //Funcion para pillar todos los generos guardados en array
  try {
    const response = await fetch(BASE_URL + "genres", { method: "GET" });

    if (!response.ok) {
      throw new Error("Error al cargar los generos.");
    }

    const result = response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

export { getAllMovies, addMovie, editMovie, deleteMovie, getAllGenres, getSingleMovie }; //Exportamos las funciones para usarlas donde plazca
