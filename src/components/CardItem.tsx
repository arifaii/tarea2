import { Character } from "../types/Character";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

interface CardItemProps {
  character: Character;
}

export const CardItem: React.FC<CardItemProps> = ({ character }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(character.id);
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Alive":
        return "#2ecc71";
      case "Dead":
        return "#e74c3c";
      default:
        return "#95a5a6";
    }
  };

  return (
    <Link to={`/item/${character.id}`} className="card-link">
      <div className="card">
        <img
          src={character.image}
          alt={character.name}
          className="card-image"
        />
        <button
          className="fav-toggle"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isFav) removeFavorite(character.id);
            else
              addFavorite({
                id: character.id,
                name: character.name,
                image: character.image,
                species: character.species,
              });
          }}
          aria-label={isFav ? "Eliminar favorito" : "Agregar favorito"}
        >
          {isFav ? "★" : "☆"}
        </button>
        <div className="card-content">
          <h3 className="card-name">{character.name}</h3>
          <div className="card-status">
            <span
              className="status-dot"
              style={{ backgroundColor: getStatusColor(character.status) }}
            />
            <span>
              {character.status} - {character.species}
            </span>
          </div>
          <div className="card-info">
            <p>
              <strong>📍 Última ubicación:</strong>
            </p>
            <p className="info-text">{character.location.name}</p>
            <p>
              <strong>🌍 Origen:</strong>
            </p>
            <p className="info-text">{character.origin.name}</p>
          </div>
          <div className="card-episodes">
            <span className="episode-badge">
              📺 {character.episode.length} episodios
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
