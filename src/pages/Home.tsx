import { FC, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { GridResultados } from "../components/GridResultados";
import { Footer } from "../components/Footer";
import { useFetch } from "../hooks/useFetch";
import { ApiResponse, Character } from "../types/Character";

const API_URL = import.meta.env.VITE_API_URL as string;

const Home: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const apiUrl = `${API_URL}?page=${currentPage}${
    searchTerm.trim() ? `&name=${encodeURIComponent(searchTerm.trim())}` : ""
  }`;

  const { data, loading, error } = useFetch<ApiResponse>(apiUrl);

  const characters: Character[] = data?.results ?? [];
  const totalPages = data?.info.pages ?? 0;
  const totalResults = data?.info.count ?? 0;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  if (!isLoaded) return null;

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <main className="main-content">
        <GridResultados
          characters={characters}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </main>
      <Footer />

      {/* Botón de scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="scroll-top"
        aria-label="Volver arriba"
      >
        ↑
      </button>
    </div>
  );
};

export default Home;
