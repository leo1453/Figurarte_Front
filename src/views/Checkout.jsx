import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import ButtonCustom from "../components/ButtonCustom";
import FeedbackSnackbar from "../components/FeedbackSnackbar";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // IMPORTANTE

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [alerta, setAlerta] = useState({ tipo: "", mensaje: "" });
  const navigate = useNavigate();

  const { refreshCart } = useCart(); // ACCEDEMOS AL CONTADOR GLOBAL

  // Obtener carrito filtrado por usuario
  const fetchCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setAlerta({ tipo: "error", mensaje: "Debes iniciar sesión" });
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/api/cart?user_id=${user.id}`
      );
      const data = await res.json();
      setCart(data);
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: "Error al obtener carrito" });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.precio_unitario * item.cantidad,
    0
  );

  const confirmarCompra = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setAlerta({ tipo: "error", mensaje: "Debes iniciar sesión para comprar" });
        return;
      }

      const res = await fetch("http://localhost:8000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlerta({ tipo: "error", mensaje: data.error });
        return;
      }

      // ACTUALIZAR CONTADOR GLOBAL DEL NAVBAR
      await refreshCart();

      // Redirigir al éxito
      navigate("/compra-exitosa", { state: { order: data.order } });

    } catch (error) {
      setAlerta({ tipo: "error", mensaje: "Error al procesar compra" });
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5, px: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Confirmar Compra
      </Typography>

      <Card sx={{ p: 2, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Resumen del pedido:
          </Typography>

          {cart.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1.5,
              }}
            >
              <Typography>
                {item.nombre_producto} x {item.cantidad}
              </Typography>
              <Typography>${item.precio_unitario * item.cantidad}</Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "right" }}
          >
            Total: ${total.toFixed(2)}
          </Typography>

          <ButtonCustom
            title="Confirmar compra"
            onClick={confirmarCompra}
            variant="admin"
            style={{ marginTop: "20px" }}
          />
        </CardContent>
      </Card>

      <FeedbackSnackbar alerta={alerta} setAlerta={setAlerta} />
    </Box>
  );
}
