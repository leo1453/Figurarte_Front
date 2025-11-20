import { Card, CardContent, Typography } from "@mui/material";

export default function HomeCard({ item }) {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        transition: "0.2s",
        "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {item.title}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
          {item.description}
        </Typography>

        <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
          {item.date}
        </Typography>
      </CardContent>
    </Card>
  );
}
