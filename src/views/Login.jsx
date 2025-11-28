import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/figurarte.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al iniciar sesión");
        return;
      }

      // Guardar usuario en localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirección según rol
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError("Error del servidor");
      console.error(err);
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
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
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
            marginBottom: "10px",
            objectFit: "contain",
          }}
        />

        <h2 style={{ color: "#333", marginBottom: "25px" }}>Iniciar Sesión</h2>

        {error && (
          <p
            style={{
              color: "red",
              background: "#ffe6e6",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
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

          <div style={{ marginBottom: "25px" }}>
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
            }}
          >
            Entrar
          </button>
        </form>

        <p style={{ marginTop: "20px", color: "#555" }}>
          ¿No tienes cuenta?{" "}
          <Link to="/register" style={{ color: "#6a11cb", fontWeight: "bold" }}>
            Crear una cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
