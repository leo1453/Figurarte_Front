import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const loadCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      // Si nadie ha iniciado sesión
      if (!userId) {
        setCartCount(0);
        return;
      }

      // Hacer la petición correcta al backend
      const res = await fetch(
        `http://localhost:8000/api/cart?user_id=${userId}`
      );

      const data = await res.json();

      // Sumar cantidades del carrito real
      const totalItems = data.reduce(
        (sum, item) => sum + item.cantidad,
        0
      );

      setCartCount(totalItems);

    } catch (error) {
      console.log("Error cargando carrito:", error);
    }
  };

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
