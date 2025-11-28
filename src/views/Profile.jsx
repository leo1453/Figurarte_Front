import React, { useState, useEffect } from "react";
import ButtonCustom from "../components/ButtonCustom";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;

  const [form, setForm] = useState({
    id: storedUser?.id || null,
    name: "",
    email: "",
    shipping_address: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (storedUser) {
      setForm({
        id: storedUser.id,
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
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Error al actualizar.");
        return;
      }

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
        margin: "50px auto",
        padding: "40px",
        background: "linear-gradient(145deg, #ffe4f7, #f0f8ff)",
        borderRadius: "25px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        border: "2px solid #f2dfff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold",
          color: "#c066ff",
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
        }}
      >
        Mi Perfil 🌸
      </h2>

      {message && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px",
            background: "#fffae6",
            border: "1px solid #ffe58f",
            borderRadius: "12px",
            color: "#9c6b00",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "0.95rem",
          }}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div>
          <label style={labelStyle}>Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Correo</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Dirección de envío</label>
          <input
            name="shipping_address"
            value={form.shipping_address}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Nueva contraseña (opcional)</label>
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

      <div style={{ marginTop: "25px" }}>
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

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "bold",
  color: "#6a11cb",
  fontSize: "0.95rem",
  fontFamily: "'Roboto', sans-serif",
};

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  borderRadius: "15px",
  border: "1.5px solid #e0c0ff",
  outline: "none",
  fontSize: "1rem",
  transition: "all 0.2s",
  background: "#fffafa",
};
