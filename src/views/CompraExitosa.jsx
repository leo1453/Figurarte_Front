import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  CardMedia,
} from "@mui/material";

export default function CompraExitosa() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state?.order;

  if (!order) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5">No hay información de compra.</Typography>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate("/")}>
          Volver al inicio
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 750, mx: "auto", mt: 6, px: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 1,
          color: "#333",
        }}
      >
        🎉 ¡Compra Exitosa!
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          fontSize: "18px",
          color: "#666",
          mb: 3,
        }}
      >
        Gracias por tu compra. Aquí tienes el resumen detallado.
      </Typography>

      <Card
        sx={{
          borderRadius: 4,
          p: 2,
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            🧾 Información del Pedido
          </Typography>

          <Typography>
            <strong>ID de Orden:</strong> {order.id}
          </Typography>
          <Typography>
            <strong>Estado:</strong>{" "}
            <span style={{ color: "#4CAF50" }}>{order.status}</span>
          </Typography>
          <Typography>
            <strong>Total Pagado:</strong>{" "}
            <span style={{ color: "#FF66A6", fontWeight: "bold" }}>
              ${order.total}
            </span>
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* PRODUCTOS */}
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            🛍️ Productos Comprados
          </Typography>

          {order.items.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <CardMedia
                component="img"
                image={item.imagen}
                alt={item.nombre_producto}
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />

              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {item.nombre_producto}
                </Typography>

                <Typography sx={{ fontSize: "14px", opacity: 0.8 }}>
                  {item.cantidad} x ${item.precio_unitario}
                </Typography>
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <Button
        variant="contained"
        color="primary"
        onClick={() => {
            window.open(`http://localhost:8000/api/orders/${order.id}/ticket`, "_blank");
        }}
    >
        📄 Descargar Ticket (PDF)
    </Button>

    <Button
        variant="contained"
        color="secondary"
        onClick={() => {
            window.open(`http://localhost:8000/api/orders/${order.id}/factura`, "_blank");
        }}
    >
        🧾 Descargar Factura (PDF)
    </Button>

    <Button
        variant="text"
        onClick={() => navigate("/")}
        sx={{ mt: 1 }}
    >
        ← Volver al inicio
    </Button>
</Box>

        </CardContent>
      </Card>
    </Box>
  );
}
