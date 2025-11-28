import React, { useState, useEffect } from "react";
import ButtonCustom from "../components/ButtonCustom";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;

  const [form, setForm] = useState({
    id: storedUser?.id || null,   // 🔹 AGREGADO
    name: "",
    email: "",
    shipping_address: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (storedUser) {
      setForm({
        id: storedUser.id,   // 🔹 AGREGADO
        name: storedUser.name || "",
        email: storedUser.email || "",
        shipping_address: storedUser.shipping_address || "",
        password: "",
      });
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form), // 🔹 ENVÍA TAMBIÉN EL ID
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Error al actualizar.");
        return;
      }

      // Actualizar localStorage
      const updatedUser = {
        ...storedUser,
        name: data.user.name,
        email: data.user.email,
        shipping_address: data.user.shipping_address,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("Perfil actualizado correctamente ✔");

      setTimeout(() => setMessage(""), 2500);
    } catch (error) {
      console.error(error);
      setMessage("Error de conexión.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "40px",
        background: "white",
        borderRadius: "15px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Mi Perfil</h2>

      {message && (
        <div
          style={{
            marginBottom: "15px",
            padding: "10px",
            background: "#e2ffe2",
            borderRadius: "8px",
            color: "#1a7f1a",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

        <div>
          <label>Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label>Correo</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label>Dirección de envío</label>
          <input
            name="shipping_address"
            value={form.shipping_address}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label>Nueva contraseña (opcional)</label>
          <input
            type="password"
            name="password"
            placeholder="Dejar vacío si no quieres cambiarla"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <ButtonCustom title="Guardar cambios" type="submit" variant="admin" />

      </form>

      <div style={{ marginTop: "20px" }}>
        <ButtonCustom
          title="Cerrar sesión"
          variant="delete"
          fullWidth
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        />
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginTop: "5px",
};
