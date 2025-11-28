import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Box
} from "@mui/material";

import ButtonCustom from "../components/ButtonCustom"; // IMPORTANTE

const ProductCard = ({ image, name, price, onClick }) => {
  return (
    <Card
      sx={{
        width: 260,
        borderRadius: 3,
        boxShadow: 3,
        "&:hover": { boxShadow: 6 },
        transition: "0.3s",
        backgroundColor: "white"
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={image}
        alt={name}
        sx={{
          objectFit: "cover",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12
        }}
      />

      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          {name}
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: "#FF66A6", fontWeight: "bold", mb: 1 }}
        >
          ${price}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2 }}>
        <ButtonCustom
          title="Ver detalle"
          onClick={onClick}
        />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
