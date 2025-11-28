import React, { useState, useEffect } from "react";
import { Modal, Fade, Box, Typography } from "@mui/material";
import ButtonCustom from "./ButtonCustom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  borderRadius: 3,
  padding: "30px 25px",
  width: 400,
  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
};

const inputStyle = {
  width: "100%",
  padding: "10px 15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginBottom: "10px",
};

export default function EditProductModal({ open, onClose, product, onSave }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    stock: "",
    categoria: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        imagen: product.imagen,
        stock: product.stock,
        categoria: product.categoria,
      });
    }
  }, [product]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
          >
            {product ? "Editar Producto" : "Nuevo Producto"}
          </Typography>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <input
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="descripcion"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="precio"
              type="number"
              placeholder="Precio"
              value={form.precio}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="imagen"
              placeholder="URL Imagen"
              value={form.imagen}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="stock"
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="categoria"
              placeholder="Categoría"
              value={form.categoria}
              onChange={handleChange}
              style={inputStyle}
            />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <ButtonCustom
                title="Cancelar"
                onClick={onClose}
                variant="cancel"
              />
              <ButtonCustom title="Guardar" type="submit" variant="admin" />
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}
