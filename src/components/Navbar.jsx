import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import logo from "../assets/figurarte.png";
import UserMenu from "../components/UserMenu";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    if (!user) return;
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login");
  };

  // Detectar clic fuera y cerrar menú
  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

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
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link to="/" style={{ display: "block" }}>
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

      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
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

      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        {!user ? (
          <Link to="/login" style={{ color: "black" }}>
            <PersonOutlineIcon style={{ fontSize: "28px", cursor: "pointer" }} />
          </Link>
        ) : (
          <div style={{ position: "relative" }} ref={userMenuRef}>
            <PersonOutlineIcon
              onClick={toggleMenu}
              style={{ fontSize: "28px", cursor: "pointer", color: "black" }}
            />

            {menuOpen && (
              <UserMenu
                user={user}
                onLogout={handleLogout}
              />
            )}
          </div>
        )}

        <Link to="/carrito" style={{ color: "black" }}>
          <ShoppingCartOutlinedIcon
            style={{ fontSize: "28px", cursor: "pointer" }}
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
