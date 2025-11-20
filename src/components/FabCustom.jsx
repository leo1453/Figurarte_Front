import { Fab } from "@mui/material";

export default function FabCustom({ icon, title, onClick }) {
  return (
    <Fab
      aria-label={title}
      onClick={onClick}
      sx={{
        backgroundColor: "#e59be0ff",
        color: "black",
        "&:hover": {
          backgroundColor: "#e0a800",
        },
      }}
    >
      {icon}
    </Fab>
  );
}
