import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { GridResultados } from "./components/GridResultados";
import { Footer } from "./components/Footer";
import { useCharacters } from "./hooks/useCharacters";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const { characters, loading, error, totalPages, totalResults } =
    useCharacters(searchTerm, currentPage);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Resetear página cuando cambia la búsqueda
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
    // Nota: La API de Rick and Morty siempre devuelve 20 por página
    // Esto es visual por ahora
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
}

export default App;
