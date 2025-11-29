import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import FeedbackSnackbar from "../components/FeedbackSnackbar";
import Loader from "../components/Loader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AdminPanel = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [pokemonCards, setPokemonCards] = useState([]);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(
    "Cargando cartas disponibles..."
  );

  const [alerta, setAlerta] = useState({ tipo: "", mensaje: "" });

  if (!user || user.role !== "admin") {
    return <h2 style={{ textAlign: "center" }}>Acceso denegado</h2>;
  }

  async function fetchProducts() {
    const res = await fetch("http://localhost:8000/api/products");
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function loadPokemonCards() {
    try {
      setLoadingText("Cargando cartas disponibles...");
      setLoading(true);

      setTimeout(() => {
        setLoadingText("Esto puede tardar un poco...");
      }, 3500);

      const res = await fetch("/tcg/cards?pageSize=30");
      const data = await res.json();
      const cards = data.data.map((card) => ({
        nombre: card.name,
        descripcion: card.supertype + " / " + (card.subtypes?.join(", ") || ""),
        precio: 99,
        imagen: card.images.small,
        stock: 10,
        categoria: "Pokemon Card",
      }));

      setPokemonCards(cards);
      setAlerta({
        tipo: "success",
        mensaje: "Cartas Pokémon cargadas correctamente",
      });
    } catch {
      setAlerta({
        tipo: "error",
        mensaje: "Error al cargar cartas Pokémon",
      });
    } finally {
      setLoading(false);
    }
  }

  async function saveImportedCard(card) {
    try {
      await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card),
      });

      setAlerta({
        tipo: "success",
        mensaje: `Carta "${card.nombre}" guardada correctamente`,
      });

      fetchProducts();
    } catch {
      setAlerta({
        tipo: "error",
        mensaje: "No se pudo guardar la carta",
      });
    }
  }

  const handleExcelClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleExcelFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const excelProducts = rows.map((row) => ({
        nombre: row[0] || "",
        descripcion: row[1] || "",
        precio: parseFloat(row[2]) || 0,
        imagen: row[3] || "",
        stock: parseInt(row[4]) || 0,
        categoria: row[5] || "",
      }));

      for (const product of excelProducts) {
        await fetch("http://localhost:8000/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
      }

      setAlerta({
        tipo: "success",
        mensaje: "Productos importados desde Excel correctamente",
      });

      fetchProducts();
    } catch (error) {
      setAlerta({
        tipo: "error",
        mensaje: "Error al importar archivo de Excel",
      });
    }
  };

  if (loading) return <Loader text={loadingText} />;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "78.5vh",
        background: "#fceaff",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleExcelFile}
      />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Panel de Administrador
        </h2>

        {/* CARDS EN FILA */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          <div
            onClick={() => navigate("/")}
            style={cardStyle("#e2d7ff")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.04)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Administrar Productos
          </div>

          <div
            onClick={handleExcelClick}
            style={cardStyle("#d4f8d3")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.04)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Importar Excel
          </div>

          <div
            onClick={loadPokemonCards}
            style={cardStyle("#ffd4e8")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.04)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Cartas Pokémon
          </div>

          <div
            onClick={() => navigate("/admin/users")}
            style={cardStyle("#d6ecff")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.04)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Gestionar Usuarios
          </div>
        </div>
        <Accordion
          defaultExpanded
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            background: "#f7eaff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              background: "#e4ccff",
              padding: "15px 20px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
              }}
            >
              Productos existentes
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ padding: 0 }}>
            <Paper
              sx={{
                width: "100%",
                overflow: "hidden",
                borderRadius: 0,
              }}
            >
              <Table>
                <TableHead sx={{ background: "#f1e4ff" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Precio</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Stock</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Categoría</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {products.map((p) => (
                    <TableRow
                      key={p.id}
                      sx={{
                        "&:hover": { background: "#f6f0ff" },
                        transition: "0.2s",
                      }}
                    >
                      <TableCell>{p.nombre}</TableCell>
                      <TableCell>${p.precio}</TableCell>
                      <TableCell>{p.stock}</TableCell>
                      <TableCell>{p.categoria}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </AccordionDetails>
        </Accordion>

        {/* PREVIEW POKÉMON */}
        {pokemonCards.length > 0 && (
          <>
            <h3>Cartas Pokémon a importar</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "15px",
              }}
            >
              {pokemonCards.map((card, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "10px",
                    textAlign: "center",
                    background: "#fff0f8",
                  }}
                >
                  <img
                    src={card.imagen}
                    alt={card.nombre}
                    style={{
                      width: "100px",
                      height: "140px",
                      marginBottom: "8px",
                      borderRadius: "10px",
                    }}
                  />

                  <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    {card.nombre}
                  </div>

                  <button
                    onClick={() => saveImportedCard(card)}
                    style={{
                      marginTop: "10px",
                      width: "100%",
                      padding: "8px",
                      border: "none",
                      borderRadius: "10px",
                      background: "#6a11cb",
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Importar
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* SNACKBAR */}
      <FeedbackSnackbar alerta={alerta} setAlerta={setAlerta} />
    </div>
  );
};

const cardStyle = (bg) => ({
  padding: "25px",
  background: bg,
  borderRadius: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  cursor: "pointer",
  transition: "0.3s",
  textAlign: "center",
  fontWeight: "600",
});

export default AdminPanel;
