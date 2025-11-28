import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Divider,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ButtonCustom from "../components/ButtonCustom";
import FeedbackSnackbar from "../components/FeedbackSnackbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alerta, setAlerta] = useState({ tipo: "", mensaje: "" });

  const { refreshCart } = useCart();
const navigate = useNavigate();

const handleCheckout = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      setAlerta({
        tipo: "error",
        mensaje: data.error || "Error al procesar la compra",
      });
      return;
    }

    // Actualiza el carrito global
    refreshCart();

    // Redirige a pantalla de éxito
    navigate("/compra-exitosa", { state: { order: data.order } });

  } catch (error) {
    console.error(error);
    setAlerta({
      tipo: "error",
      mensaje: "Hubo un error durante la compra",
    });
  }
};


  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/cart");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      setAlerta({
        tipo: "error",
        mensaje: "Error al cargar el carrito",
      });
    }
    setLoading(false);
  };

  const removeItem = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/cart/${id}`, { method: "DELETE" });
      setAlerta({ tipo: "success", mensaje: "Producto eliminado" });
      fetchCart();
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: "Error al eliminar el producto" });
    }
  };

  const clearCart = async () => {
    try {
      await fetch("http://localhost:8000/api/cart", { method: "DELETE" });
      setAlerta({ tipo: "success", mensaje: "Carrito vaciado" });
      fetchCart();
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: "Error al vaciar el carrito" });
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.precio_unitario * item.cantidad,
    0
  );

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 3, px: 2 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 3, textAlign: "center", color: "#333" }}
      >
        🛒 Tu Carrito
      </Typography>

      {items.length === 0 ? (
        <Typography sx={{ textAlign: "center", fontSize: "18px", mt: 4 }}>
          Tu carrito está vacío 😢
        </Typography>
      ) : (
        <>
          {items.map((item) => (
            <Card
              key={item.id}
              sx={{
                display: "flex",
                mb: 2,
                p: 1.5,
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <CardMedia
                component="img"
                image={item.imagen}
                alt={item.nombre_producto}
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />

              <CardContent sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  {item.nombre_producto}
                </Typography>

                <Typography sx={{ mt: 1, fontSize: "15px" }}>
                  Precio:{" "}
                  <span style={{ fontWeight: "bold", color: "#FF66A6" }}>
                    ${item.precio_unitario}
                  </span>
                </Typography>

                <Typography sx={{ fontSize: "15px" }}>
                  Cantidad: <strong>{item.cantidad}</strong>
                </Typography>

                <Typography sx={{ mt: 1, fontSize: "14px", opacity: 0.8 }}>
                  Subtotal:{" "}
                  <strong>
                    ${item.precio_unitario * item.cantidad}
                  </strong>
                </Typography>
              </CardContent>

              <Box sx={{ display: "flex", alignItems: "center", pr: 1 }}>
                <IconButton
                  onClick={() => removeItem(item.id)}
                  sx={{
                    color: "#FF4D6D",
                    "&:hover": { color: "#ff002b" },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          ))}

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              textAlign: "right",
              mb: 3,
              pr: 1,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Total:{" "}
              <span style={{ color: "#FF66A6" }}>
                ${total.toFixed(2)}
              </span>
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              mb: 5,
            }}
          >
            <ButtonCustom
              title="Vaciar Carrito"
              onClick={clearCart}
              variant="delete"
            />
   <ButtonCustom
  title="Comprar ahora"
  onClick={() => navigate("/checkout")}
  variant="admin"
/>


          </Box>
        </>
      )}

      <FeedbackSnackbar alerta={alerta} setAlerta={setAlerta} />
    </Box>
  );
}
