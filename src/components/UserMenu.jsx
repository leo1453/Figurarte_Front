import React, { useEffect, useRef } from "react";
import { Paper, Box, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ButtonCustom from "./ButtonCustom";
import { Link } from "react-router-dom";

export default function UserMenu({ user, onLogout, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose && onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const isAdmin = user?.role === "admin";

  return (
    <Paper
      ref={menuRef}
      elevation={4}
      sx={{
        position: "absolute",
        top: "45px",
        right: 0,
        width: 260,
        padding: 2,
        borderRadius: 3,
        background: "white",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        transformOrigin: "top right",
        animation: "menuAnimation 0.18s ease-out",
        "@keyframes menuAnimation": {
          "0%": { opacity: 0, transform: "scale(0.8)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-8px",
          right: "12px",
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: "8px solid white",
          filter: "drop-shadow(0px -1px 2px rgba(0,0,0,0.1))",
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mb: 1.5 }}>
        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "#e59be0ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            fontSize: "40px",
          }}
        >
          <PersonOutlineIcon fontSize="inherit" />
        </Box>
      </Box>

      <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>
        {user?.name || "Usuario"}
      </Typography>

      <Typography sx={{ textAlign: "center", color: "#555" }}>
        {user?.email || "correo@correo.com"}
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          fontSize: "0.9rem",
          fontWeight: "bold",
          color: isAdmin ? "#6a11cb" : "#2575fc",
        }}
      >
        Rol: {(user?.role || "user").toUpperCase()}
      </Typography>
      <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        {isAdmin ? (
          <>
            <Link to="/admin/panel" style={{ textDecoration: "none" }}>
              <ButtonCustom title="Panel de administrador" fullWidth variant="admin" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <ButtonCustom title="Mi Perfil" fullWidth variant="admin" />
            </Link>
            <Link to="/wishlist" style={{ textDecoration: "none" }}>
              <ButtonCustom title="Lista de deseos" fullWidth variant="admin" />
            </Link>
          </>
        )}
      </Box>

      <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
        <ButtonCustom title="Cerrar sesión" variant="delete" onClick={onLogout} />
      </Box>
    </Paper>
  );
}
