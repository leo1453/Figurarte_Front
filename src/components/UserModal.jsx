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

export default function UserModal({ open, onClose, user, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
    shipping_address: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        shipping_address: user.shipping_address || "",
        password: "",
      });
    }
  }, [user]);

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
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
            {user?.id ? "Editar Usuario" : "Nuevo Usuario"}
          </Typography>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <input
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            {!user?.id && (
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            )}
            <input
              name="shipping_address"
              placeholder="Dirección"
              value={form.shipping_address}
              onChange={handleChange}
              style={inputStyle}
            />
            <select name="role" value={form.role} onChange={handleChange} style={inputStyle}>
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <ButtonCustom title="Cancelar" onClick={onClose} variant="cancel" />
              <ButtonCustom title="Guardar" type="submit" variant="admin" />
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}
