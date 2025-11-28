import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  // Cargar carrito al iniciar la app
  const loadCart = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/cart");
      const data = await res.json();

      const totalItems = data.reduce(
        (sum, item) => sum + item.cantidad,
        0
      );

      setCartCount(totalItems);
    } catch (error) {
      console.log("Error cargando carrito:", error);
    }
  };

  // Llamar función desde cualquier parte
  const refreshCart = () => loadCart();

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
