import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

export const ProductGrid = ({ items }) => {
  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <ProductCard
            image={item.image}
            name={item.name}
            price={item.price}
            onClick={() => console.log("Clicked", item.name)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
