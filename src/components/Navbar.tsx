import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const Navbar = () => {
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites ({favorites.length})</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
};

export default Navbar;
