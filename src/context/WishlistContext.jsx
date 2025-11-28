import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/favorites");
      const data = await res.json();
      setWishlist(data);
    } catch (error) {
      console.error("Error cargando favoritos:", error);
    }
  };

  const toggleFavorite = async (productId) => {
    await fetch("http://localhost:8000/api/favorites/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId }),
    });

    loadWishlist(); // Recargar favoritos
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleFavorite }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}

