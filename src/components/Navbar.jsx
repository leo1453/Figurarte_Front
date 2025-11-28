import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import logo from "../assets/figurarte.png";
import UserMenu from "../components/UserMenu";

function Navbar() {
  const navigate = useNavigate();   // 👈 agregado para navegación
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const isAdmin = user?.role === "admin";

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
      <div>
        <Link to="/">
          <div
            style={{
              width: "180px",
              height: "100px",
              cursor: "pointer",
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

      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        {user ? (
          <div style={{ position: "relative" }}>
            <PersonOutlineIcon
              onClick={toggleMenu}
              style={{
                fontSize: "28px",
                cursor: "pointer",
                color: isAdmin ? "#c0392b" : "black",
              }}
            />

            {menuOpen && (
              <UserMenu
                user={user}
                onLogout={() => {
                  localStorage.removeItem("user");
                  setMenuOpen(false);
                  navigate("/login");   // 👈 CORRECCIÓN DEL BUG
                }}
                onClose={() => setMenuOpen(false)}
              />
            )}
          </div>
        ) : (
          <Link to="/login" style={{ color: "black" }}>
            <PersonOutlineIcon
              style={{ fontSize: "28px", cursor: "pointer" }}
            />
          </Link>
        )}

        {!isAdmin && user && (
          <Link to="/cart" style={{ color: "black" }}>
            <ShoppingCartOutlinedIcon
              style={{ fontSize: "28px", cursor: "pointer" }}
            />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
