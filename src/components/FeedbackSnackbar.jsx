import { Snackbar, Alert } from "@mui/material";

export default function FeedbackSnackbar({ alerta, setAlerta }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setAlerta({ tipo: "", mensaje: "" });
  };

  if (!alerta.mensaje) return null;

  return (
    <Snackbar open={!!alerta.mensaje} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={alerta.tipo || "info"}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {alerta.mensaje}
      </Alert>
    </Snackbar>
  );
}
