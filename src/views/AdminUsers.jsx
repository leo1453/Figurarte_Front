import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Title from "../components/Title";
import FabCustom from "../components/FabCustom";
import FeedbackSnackbar from "../components/FeedbackSnackbar";
import UserModal from "../components/UserModal";
import { UserGrid } from "../components/UserGrid";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({ tipo: "", mensaje: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: "Error al cargar usuarios" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user = null) => {
    setEditingUser(user || {});
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (editingUser?.id) {
        await fetch(`http://localhost:8000/api/users/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setAlerta({ tipo: "success", mensaje: "Usuario actualizado correctamente" });
      } else {
        await fetch(`http://localhost:8000/api/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setAlerta({ tipo: "success", mensaje: "Usuario creado correctamente" });
      }
      setModalOpen(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: "Error al guardar usuario" });
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/users/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setAlerta({ tipo: "success", mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: "Error al eliminar usuario" });
    }
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {loading && (
        <Box sx={{
          position: "fixed", inset: 0,
          display: "flex", justifyContent: "center", alignItems: "center",
          bgcolor: "rgba(255,255,255,0.7)", zIndex: 999
        }}>
          <CircularProgress size={60} />
        </Box>
      )}

      <Title text="GESTIÓN DE USUARIOS" />

      <UserGrid users={users} onEditUser={openModal} onDeleteUser={deleteUser} />

      <UserModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingUser(null);
        }}
        user={editingUser}
        onSave={handleSave}
      />

      <Box sx={{ position: "fixed", bottom: 32, right: 32 }}>
        <FabCustom icon={<AddIcon />} title="Agregar Usuario" onClick={() => openModal()} />
      </Box>

      <FeedbackSnackbar alerta={alerta} setAlerta={setAlerta} />
    </Box>
  );
};

export default AdminUsers;
