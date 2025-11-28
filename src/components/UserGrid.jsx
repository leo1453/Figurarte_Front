import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonCustom from "./ButtonCustom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export const UserGrid = ({ users, onEditUser, onDeleteUser }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      onDeleteUser(selectedUser.id);
    }
    setOpenDelete(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Grid container spacing={3} sx={{ p: 2 }}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                },
                backgroundColor: "#fef6ff",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "#e59be0",
                    color: "white",
                    mr: 2,
                    width: 50,
                    height: 50,
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                >
                  {user.name[0].toUpperCase()}
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.7,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 13,
                    }}
                  >
                    {user.email}
                  </Typography>
                </Box>
              </Box>

              <CardContent sx={{ pt: 0, pb: 1, textAlign: "center" }}>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    borderRadius: 20,
                    backgroundColor:
                      user.role === "admin" ? "#6a11cb33" : "#e59be033",
                    color: user.role === "admin" ? "#6a11cb" : "#e59be0",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 13,
                    mb: 1,
                  }}
                >
                  {user.role}
                </Box>
                {user.shipping_address && (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.5,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 12,
                      color: "gray",
                    }}
                  >
                    {user.shipping_address}
                  </Typography>
                )}
              </CardContent>

              <CardActions
                sx={{
                  justifyContent: "space-evenly",
                  pb: 2,
                }}
              >
                <ButtonCustom
                  title="Editar"
                  icon={<EditIcon />}
                  variant="adminOutline"
                  onClick={() => onEditUser(user)}
                />
                <ButtonCustom
                  title="Eliminar"
                  icon={<DeleteIcon />}
                  variant="delete"
                  onClick={() => handleDeleteClick(user)}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ConfirmDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar usuario"
        description="¿Estás seguro de que quieres eliminar este usuario?"
      />
    </>
  );
};
