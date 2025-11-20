import React, { useState } from "react";
import { Box, Grid, IconButton, Tooltip, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Add from "@mui/icons-material/Add";

import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import FabCustom from "../components/FabCustom";
import FeedbackSnackbar from "../components/FeedbackSnackbar";

const Home = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [alerta, setAlerta] = useState({ tipo: "", mensaje: "" });
  const [loading] = useState(false);

  // Datos visuales dummy
  const demoItems = [
    { id: 1, title: "Reporte 01", description: "Auditoría Interna A", date: "10/11/2024" },
    { id: 2, title: "Reporte 02", description: "Auditoría de Procesos", date: "08/10/2024" },
    { id: 3, title: "Reporte 03", description: "Control de Calidad", date: "05/09/2024" },
    { id: 4, title: "Reporte 04", description: "Auditoría Externa", date: "20/08/2024" },
  ];

  return (
<Box sx={{ width: "100%", p: 0, m: 0 }}>
      
      {/* Loader visual (por si quieres mantenerlo en la plantilla) */}
      {loading && (
        <Box sx={{
          position: "fixed",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "rgba(255,255,255,0.6)",
          zIndex: 999,
        }}>
          <CircularProgress size={60} />
        </Box>
      )}

      <Title text="Panel Principal" />

      {/* Buscador visual */}
      <SearchBar
        open={searchOpen}
        setOpen={setSearchOpen}
        placeholder="Buscar reportes..."
      />

      {/* FAB buscador */}
      <Box sx={{ position: "fixed", bottom: 100, right: 16 }}>
        <Tooltip title="Buscar">
          <IconButton
            onClick={() => setSearchOpen(!searchOpen)}
            sx={{
              backgroundColor: "#004A98",
              color: "white",
              "&:hover": { backgroundColor: "#003366" },
              width: 56,
              height: 56,
              borderRadius: "50%",
              boxShadow: 3,
            }}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* FAB agregar */}
      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <FabCustom
          title="Agregar"
          icon={<Add />}
          onClick={() => setAlerta({ tipo: "info", mensaje: "Acción visual" })}
        />
      </Box>

      {/* Snackbar visual */}
      <FeedbackSnackbar
        open={!!alerta.mensaje}
        onClose={() => setAlerta({ tipo: "", mensaje: "" })}
        type={alerta.tipo}
        title={alerta.tipo?.toUpperCase()}
        message={alerta.mensaje}
      />
    </Box>
  );
};

export default Home;
