import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

export const ProductGrid = ({ items, isAdmin, onEditProduct, onDeleteProduct }) => {
  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <ProductCard
            image={item.imagen}
            name={item.nombre}
            price={item.precio}
            onClick={() => console.log("Ver detalle", item.nombre)}
            isAdmin={isAdmin}
            onEdit={() => onEditProduct(item)}
            onDelete={() => onDeleteProduct(item.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
