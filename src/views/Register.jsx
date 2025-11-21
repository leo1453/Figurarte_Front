import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/figurarte.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registro exitoso");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "78.5vh",
        background: "#f8f4ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "160px",
            objectFit: "contain",
          }}
        />
        <h2 style={{ color: "#333", marginBottom: "25px" }}>Crear Cuenta</h2>
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: "30px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: "30px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: "30px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                outline: "none",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "30px",
              background: "linear-gradient(90deg, #6a11cb, #2575fc)",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Registrarme
          </button>
        </form>

        {/* Login link */}
        <p style={{ marginTop: "20px", color: "#555" }}>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" style={{ color: "#6a11cb", fontWeight: "bold" }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
