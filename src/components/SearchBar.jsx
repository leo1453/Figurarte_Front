import { Box, TextField, Collapse } from "@mui/material";

export default function SearchBar({ open, placeholder }) {
  return (
    <Collapse in={open}>
      <Box sx={{ mb: 2 }}>
        <TextField fullWidth variant="outlined" label={placeholder} />
      </Box>
    </Collapse>
  );
}
