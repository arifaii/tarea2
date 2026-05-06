import { Character } from "../types/Character";

interface CardItemProps {
  character: Character;
}

export const CardItem: React.FC<CardItemProps> = ({ character }) => {
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
    <div className="card">
      <img src={character.image} alt={character.name} className="card-image" />
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
  );
};
