import { Button } from "@mui/material";

export default function ButtonCustom({
  icon,
  title,
  onClick,
  variant = "primary",
  ...props
}) {
  const styles = {
    primary: {
      backgroundColor: "#e59be0ff",
      color: "black",
      "&:hover": { backgroundColor: "#e0a800" },
    },
    cancel: {
      backgroundColor: "#b5b5b5",
      color: "black",
      "&:hover": { backgroundColor: "#9a9a9a" },
    },
    delete: {
      backgroundColor: "#ff4d4d",
      color: "white",
      "&:hover": { backgroundColor: "#cc0000" },
    },
    disabled: {
      backgroundColor: "#d9d9d9",
      color: "#7a7a7a",
      cursor: "not-allowed",
      pointerEvents: "none",
    },
    success: {
      backgroundColor: "#4caf50",
      color: "white",
      "&:hover": { backgroundColor: "#3e8f41" },
    },
    warning: {
      backgroundColor: "#ffb300",
      color: "black",
      "&:hover": { backgroundColor: "#e09c00" },
    },
    admin: {
      backgroundColor: "#6a11cb",
      color: "white",
      "&:hover": { backgroundColor: "#520fa1" },
    },

    adminOutline: {
      backgroundColor: "transparent",
      border: "2px solid #6a11cb",
      color: "#6a11cb",
      "&:hover": {
        backgroundColor: "rgba(106,17,203,0.1)",
      },
    },
  };

  return (
    <Button
      variant="contained"
      startIcon={icon}
      onClick={onClick}
      sx={{
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: "30px",
        paddingX: 3,
        paddingY: 1.2,
        boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
        ...styles[variant],
      }}
      {...props}
    >
      {title}
    </Button>
  );
}
