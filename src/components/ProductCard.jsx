import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Box,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import ButtonCustom from "../components/ButtonCustom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

import { useWishlist } from "../context/WishlistContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  borderRadius: 3,
  padding: "30px 25px",
  width: 350,
  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
  textAlign: "center",
};

const ProductCard = ({
  id,
  image,
  name,
  price,
  onClick,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  const [openDelete, setOpenDelete] = useState(false);

  // ⭐ Obtenemos favoritos y funciones
  const { wishlist, toggleFavorite } = useWishlist();

  // ⭐ Leer usuario real
  const user = JSON.parse(localStorage.getItem("user"));

  // ⭐ Ver si ya está en favoritos
  const isFavorited = wishlist.some((fav) => fav.product_id === id);

  // 👉 Función que incluye user_id
  const handleToggleFavorite = () => {
    if (!user) {
      alert("Debes iniciar sesión para guardar favoritos");
      return;
    }

    toggleFavorite(id, user.id); // 👈 ENVÍA EL user_id
  };

  return (
    <>
      <Card
        sx={{
          width: 260,
          borderRadius: 4,
          overflow: "hidden",
          background: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          transition: "all 0.25s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 260,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* ⭐ ICONO DE FAVORITOS */}
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 10,
              cursor: "pointer",
              background: "rgba(255,255,255,0.7)",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleToggleFavorite}
          >
            {isFavorited ? (
              <FavoriteIcon sx={{ color: "red", fontSize: 24 }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "#444", fontSize: 24 }} />
            )}
          </Box>

          <CardMedia
            component="img"
            image={image}
            alt={name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transition: "0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
        </Box>

        <CardContent sx={{ textAlign: "center", paddingBottom: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
            {name}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#FF66A6",
              fontWeight: "bold",
              mt: 1,
              mb: 1,
            }}
          >
            ${price}
          </Typography>
        </CardContent>

        <CardActions sx={{ p: 2, justifyContent: "center", gap: 1 }}>
          {!isAdmin && <ButtonCustom title="Ver detalle" onClick={onClick} />}

          {isAdmin && (
            <>
              <ButtonCustom title="Editar" onClick={onEdit} variant="admin" />

              <ButtonCustom
                title="Eliminar"
                onClick={() => setOpenDelete(true)}
                variant="delete"
              />
            </>
          )}
        </CardActions>
      </Card>

      <ConfirmDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          setOpenDelete(false);
          onDelete();
        }}
        title="Eliminar producto"
        description={`¿Seguro que quieres eliminar "${name}"?`}
      />
    </>
  );
};

export default ProductCard;
