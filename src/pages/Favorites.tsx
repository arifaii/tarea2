import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) return <div>No tenés favoritos aún.</div>;

  return (
    <div className="favorites-page">
      <h1>Favoritos</h1>
      <div className="favorites-list">
        {favorites.map((f) => (
          <div key={f.id} className="favorite-item">
            <Link to={`/item/${f.id}`} className="fav-link">
              <img src={f.image} alt={f.name} />
              <div>
                <h3>{f.name}</h3>
                <p>{f.species}</p>
              </div>
            </Link>
            <button onClick={() => removeFavorite(f.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
