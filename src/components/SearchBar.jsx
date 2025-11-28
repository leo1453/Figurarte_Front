// src/components/SearchBar.jsx
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ value, onSearch, placeholder }) {
  const handleChange = (e) => {
    const term = e.target.value;
    onSearch(term);              // 🔥 dispara el filtrado al escribir
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(e.target.value);  // 🔥 también al presionar Enter
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          sx: {
            borderRadius: 999,   // estilo pastilla como en tu screenshot
            pr: 0,
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => onSearch(value)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
