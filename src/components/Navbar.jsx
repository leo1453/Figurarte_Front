import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "var(--morado)",
        color: "white",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      <span style={{ fontSize: "22px", fontWeight: "bold" }}>FigurArte</span>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link style={linkStyle} to="/">Inicio</Link>
        <Link style={linkStyle} to="/carrito">Carrito</Link>
        <Link style={linkStyle} to="/favoritos">Favoritos</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "16px",
};
