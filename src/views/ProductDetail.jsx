import React, { useState } from "react";
import { Box, Typography, Button, Snackbar, Alert, IconButton } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductDetail = () => {
  const { state: product } = useLocation();
  const { id } = useParams();

  const { refreshCart } = useCart();

  const [cantidad, setCantidad] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");

  if (!product) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Cargando producto...</Typography>
      </Box>
    );
  }

  const aumentar = () => {
    if (cantidad < product.stock) setCantidad(cantidad + 1);
  };

  const disminuir = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const agregarAlCarrito = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setAlertType("error");
        setAlertMsg("Debes iniciar sesión para agregar al carrito");
        setAlertOpen(true);
        return;
      }

      const res = await fetch("http://localhost:8000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          cantidad, // 🔥 Cantidad seleccionada
          user_id: user.id,
        }),
      });

      if (!res.ok) throw new Error("Error al agregar al carrito");

      setAlertType("success");
      setAlertMsg("Producto agregado al carrito 🎉");
      setAlertOpen(true);

      refreshCart();

    } catch (error) {
      setAlertType("error");
      setAlertMsg("Error al agregar al carrito");
      setAlertOpen(true);
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
       <Box
          component="img"
          src={product.imagen}
          alt={product.nombre}
          sx={{
            width: 400,     
            height: 400,      
            objectFit: "contain", 
            borderRadius: "14px",
            backgroundColor: "#fff",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          }}
        />

      </Box>

      <Box
        sx={{
          flex: 1,
          background: "white",
          p: 4,
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          {product.nombre}
        </Typography>

        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#FF66A6", mb: 3 }}
        >
          ${product.precio}
        </Typography>

        <Typography sx={{ fontSize: 18, mb: 2 }}>
          {product.descripcion}
        </Typography>

        <Typography sx={{ fontSize: 18, mb: 1 }}>
          <strong>Stock:</strong> {product.stock}
        </Typography>

        <Typography sx={{ fontSize: 18 }}>
          <strong>Categoría:</strong> {product.categoria}
        </Typography>

  
        <Box
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton
            onClick={disminuir}
            sx={{
              background: "#eee",
              "&:hover": { background: "#ddd" },
            }}
          >
            <RemoveIcon />
          </IconButton>

          <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
            {cantidad}
          </Typography>

          <IconButton
            onClick={aumentar}
            sx={{
              background: "#eee",
              "&:hover": { background: "#ddd" },
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>

        <Button
          variant="contained"
          sx={{
            mt: 4,
            backgroundColor: "#FF66A6",
            padding: "12px 22px",
            fontSize: 16,
            borderRadius: "12px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#ff4f99",
            },
          }}
          onClick={agregarAlCarrito}
        >
          Agregar al carrito
        </Button>
      </Box>

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={alertType} variant="filled">
          {alertMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetail;
