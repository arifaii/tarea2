import { useState, useEffect } from "react";
import { Character, ApiResponse } from "../types/character";

const API_URL = import.meta.env.VITE_API_URL;

export const useCharacters = (searchTerm: string, page: number = 1) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = `${API_URL}?page=${page}`;
        if (searchTerm.trim()) {
          url = `${API_URL}?name=${encodeURIComponent(searchTerm.trim())}&page=${page}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 404) {
            setCharacters([]);
            setTotalResults(0);
            setTotalPages(0);
            setError(
              searchTerm
                ? `No se encontraron personajes con el nombre "${searchTerm}"`
                : "No hay resultados",
            );
            return;
          }
          throw new Error("Error al cargar los datos");
        }

        const data: ApiResponse = await response.json();
        setCharacters(data.results);
        setTotalResults(data.info.count);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setCharacters([]);
        setTotalResults(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [searchTerm, page]);

  return { characters, loading, error, totalPages, totalResults };
};
