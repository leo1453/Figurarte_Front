import { Typography } from "@mui/material";

export default function Title({ text }) {
  return (
    <Typography
      variant="h4"
      sx={{ mb: 2, fontWeight: "bold", color: "#004A98" }}
    >
      {text}
    </Typography>
  );
}
