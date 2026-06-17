import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Character } from "../types/Character";
import { useFavorites } from "../context/FavoritesContext";

const API_URL = import.meta.env.VITE_API_URL as string;

const Detail = () => {
  const params = useParams();
  const id = params.id as string | undefined;
  const navigate = useNavigate();

  const apiUrl = id ? `${API_URL}/${id}` : null;
  const { data, loading, error } = useFetch<Character>(apiUrl);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!id) return <div>ID de personaje no especificado.</div>;

  if (loading) return <div>Cargando detalle...</div>;

  if (error) return <div className="error">{error}</div>;

  if (!data) return <div>No se encontró el personaje.</div>;

  return (
    <div className="detail-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Volver
      </button>
      <div className="detail-actions">
        <button
          className="fav-toggle detail-fav"
          onClick={() => {
            if (isFavorite(data.id)) removeFavorite(data.id);
            else
              addFavorite({
                id: data.id,
                name: data.name,
                image: data.image,
                species: data.species,
              });
          }}
        >
          {isFavorite(data.id) ? "★ Favorito" : "☆ Agregar favorito"}
        </button>
      </div>
      <h1>{data.name}</h1>
      <img src={data.image} alt={data.name} className="detail-image" />
      <div className="detail-info">
        <p>
          <strong>Estado:</strong> {data.status}
        </p>
        <p>
          <strong>Especie:</strong> {data.species}
        </p>
        <p>
          <strong>Género:</strong> {data.gender}
        </p>
        <p>
          <strong>Origen:</strong> {data.origin.name}
        </p>
        <p>
          <strong>Última ubicación:</strong> {data.location.name}
        </p>
        <p>
          <strong>Episodios:</strong> {data.episode.length}
        </p>
      </div>
    </div>
  );
};

export default Detail;
