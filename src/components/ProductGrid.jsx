import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

export const ProductGrid = ({ items, isAdmin, onEditProduct, onDeleteProduct, onViewDetails }) => {
  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <ProductCard
            id={item.id}
            image={item.imagen}
            name={item.nombre}
            price={item.precio}
            isAdmin={isAdmin}
            onClick={() => onViewDetails(item)}
            onEdit={() => onEditProduct(item)}
            onDelete={() => onDeleteProduct(item.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
