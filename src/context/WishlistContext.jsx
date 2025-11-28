import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id || null;
  };

  const loadWishlist = async () => {
    try {
      const userId = getUserId();

      if (!userId) {
        setWishlist([]);
        return;
      }

      const res = await fetch(
        `http://localhost:8000/api/favorites?user_id=${userId}`
      );

      const data = await res.json();
      setWishlist(data);
    } catch (error) {
      console.error("Error cargando favoritos:", error);
    }
  };

  const toggleFavorite = async (productId, userId) => {
    if (!userId) {
      console.warn("Intento de guardar favorito sin usuario logueado");
      return;
    }

    await fetch("http://localhost:8000/api/favorites/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        user_id: userId, 
      }),
    });

    loadWishlist(); 
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleFavorite, loadWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
