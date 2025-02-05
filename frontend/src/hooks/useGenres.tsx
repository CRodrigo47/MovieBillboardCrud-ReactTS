import { useEffect, useState } from "react";
import { getAllGenres } from "../services/movieService";

export default function useGenres() {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    //Guardamos los generos de la API
    const fetchGenres = async () => {
      const result = await getAllGenres();
      setGenres(result.status);
    };
    fetchGenres();
  }, []);

  return { genres };
}
