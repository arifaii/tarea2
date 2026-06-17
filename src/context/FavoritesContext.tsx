import React, { createContext, useContext, useEffect, useState } from "react";
import { Favorite } from "../types/Favorite";

interface FavoritesContextValue {
  favorites: Favorite[];
  addFavorite: (fav: Favorite) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? (JSON.parse(raw) as Favorite[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const addFavorite = (fav: Favorite) => {
    setFavorites((prev) => {
      if (prev.find((p) => p.id === fav.id)) return prev;
      return [fav, ...prev];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  const isFavorite = (id: number) => favorites.some((f) => f.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};

export default FavoritesContext;
