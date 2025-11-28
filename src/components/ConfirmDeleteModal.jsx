import React from "react";
import { Box, Typography, Modal, Fade, Backdrop } from "@mui/material";
import ButtonCustom from "./ButtonCustom";

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

const ConfirmDeleteModal = ({ open, onClose, onConfirm, title, description }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300 } }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            {title || "Confirmar eliminación"}
          </Typography>

          <Typography sx={{ mb: 3, color: "#555" }}>
            {description || "¿Seguro que quieres eliminar este elemento?"}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <ButtonCustom title="Cancelar" onClick={onClose} variant="cancel" />
            <ButtonCustom title="Eliminar" onClick={onConfirm} variant="delete" />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmDeleteModal;
