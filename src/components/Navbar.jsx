import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import logo from "../assets/figurarte.png"; 

function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        background: "white",
        padding: "10px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link to="/" style={{ display: "block" }}>
          <div
            style={{
              width: "180px",
              height: "100px",
              cursor: "pointer"
            }}
          >
            <img
              src={logo}
              alt="Figurarte Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </Link>
      </div>

      {/* Search bar */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "60%",
            display: "flex",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "30px",
            overflow: "hidden",
          }}
        >
          <input
            type="text"
            placeholder="Buscar producto..."
            style={{
              flex: 1,
              padding: "12px 20px",
              border: "none",
              outline: "none",
              fontSize: "1rem",
            }}
          />
          <button
            style={{
              padding: "12px 20px",
              border: "none",
              background: "black",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      {/* User + Cart icons */}
      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <Link to="/login" style={{ color: "black" }}>
          <PersonOutlineIcon style={{ fontSize: "28px", cursor: "pointer" }} />
        </Link>

        <Link to="/carrito" style={{ color: "black" }}>
          <ShoppingCartOutlinedIcon style={{ fontSize: "28px", cursor: "pointer" }} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
