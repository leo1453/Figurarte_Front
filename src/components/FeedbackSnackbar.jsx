import { Snackbar, Alert } from "@mui/material";

export default function FeedbackSnackbar({ open, onClose, type, title, message }) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={type || "info"} sx={{ width: "100%" }}>
        <strong>{title}: </strong> {message}
      </Alert>
    </Snackbar>
  );
}
