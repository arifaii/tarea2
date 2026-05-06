import { Character } from "../types/Character";
import { CardItem } from "./CardItem";
import { Pagination } from "./Pagination";

interface GridResultadosProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export const GridResultados: React.FC<GridResultadosProps> = ({
  characters,
  loading,
  error,
  currentPage,
  totalPages,
  totalResults,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="portal"></div>
        <p>Abriendo portal dimensional...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">😢</div>
        <p className="error-message">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="empty-container">
        <div className="empty-icon">🪐</div>
        <p className="empty-message">
          No se encontraron personajes en esta dimensión...
        </p>
        <p className="empty-subtitle">¡Probá con otra búsqueda!</p>
      </div>
    );
  }

  return (
    <div className="grid-container">
      {totalResults > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          totalResults={totalResults}
        />
      )}

      <div className="cards-grid">
        {characters.map((character) => (
          <CardItem key={character.id} character={character} />
        ))}
      </div>

      {totalResults > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          totalResults={totalResults}
        />
      )}
    </div>
  );
};
