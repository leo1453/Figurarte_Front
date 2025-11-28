import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { state: product } = useLocation();
  const { id } = useParams();

  if (!product) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Cargando producto...</Typography>
      </Box>
    );
  }

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
      {/* Imagen del producto */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={product.imagen}
          alt={product.nombre}
          sx={{
            width: "100%",
            maxWidth: 450,
            borderRadius: "14px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Información del producto */}
      <Box
        sx={{
          flex: 1,
          background: "white",
          p: 4,
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
        >
          {product.nombre}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#FF66A6",
            mb: 3,
          }}
        >
          ${product.precio}
        </Typography>

        <Typography
          sx={{
            fontSize: 18,
            lineHeight: 1.6,
            mb: 2,
            color: "#555",
          }}
        >
          {product.descripcion}
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            fontSize: 16,
          }}
        >
          <Typography>
            <strong>Stock disponible:</strong> {product.stock}
          </Typography>

          <Typography>
            <strong>Categoría:</strong> {product.categoria}
          </Typography>
        </Box>

        {/* Botón de acción */}
        <Button
          variant="contained"
          sx={{
            mt: 4,
            backgroundColor: "#FF66A6",
            color: "white",
            padding: "12px 22px",
            fontSize: 16,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(255, 102, 166, 0.4)",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#ff4f99",
              boxShadow: "0 6px 18px rgba(255, 102, 166, 0.6)",
            },
          }}
          onClick={() => alert("Próximamente: carrito 💖")}
        >
          Agregar al carrito
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetail;
