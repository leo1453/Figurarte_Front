import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <h2 style={{ textAlign: "center" }}>Acceso denegado</h2>;
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "78.5vh",
        background: "#f8f4ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          textAlign: "center"
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Panel de Administrador</h1>

        <Link
          to="/admin/products"
          style={{
            display: "inline-block",
            padding: "15px 25px",
            background: "linear-gradient(90deg, #6a11cb, #2575fc)",
            color: "white",
            borderRadius: "20px",
            textDecoration: "none",
            fontWeight: "bold",
            boxShadow: "0 3px 8px rgba(0,0,0,0.25)"
          }}
        >
          Administrar Productos
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
