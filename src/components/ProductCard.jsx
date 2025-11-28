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
  image,
  name,
  price,
  onClick,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  const [openDelete, setOpenDelete] = useState(false);

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
