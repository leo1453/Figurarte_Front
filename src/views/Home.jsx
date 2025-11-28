import React, { useState, useEffect } from "react";
import { Box, Tooltip, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import FeedbackSnackbar from "../components/FeedbackSnackbar";
import { ProductGrid } from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";
import FabCustom from "../components/FabCustom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [alerta, setAlerta] = useState({ tipo: "", mensaje: "" });
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = storedUser?.role === "admin";

  const fetchProducts = async (searchTerm = "") => {
    setLoading(true);
    try {
      const url = searchTerm
        ? `http://localhost:8000/api/products?search=${searchTerm}`
        : `http://localhost:8000/api/products`;

      const res = await fetch(url);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: "Error al cargar productos" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product = null) => {
    setEditingProduct(product || {});
    setModalOpen(true);
  };
  const handleSave = async (formData) => {
    try {
      if (editingProduct?.id) {
        await fetch(`http://localhost:8000/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setAlerta({
          tipo: "success",
          mensaje: "Producto actualizado correctamente",
        });
      } else {
        await fetch(`http://localhost:8000/api/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setAlerta({
          tipo: "success",
          mensaje: "Producto creado correctamente",
        });
      }

      setModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: "Error al guardar el producto" });
    }
  };
  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
      });
      setItems((prev) => prev.filter((item) => item.id !== id));
      setAlerta({
        tipo: "success",
        mensaje: "Producto eliminado correctamente",
      });
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: "Error al eliminar el producto" });
    }
  };
  const handleSearchSubmit = (value) => {
    setSearch(value);
    fetchProducts(value);
  };

  const navigate = useNavigate();

const handleViewDetails = (product) => {
  navigate(`/producto/${product.id}`, { state: product });
};


  return (
    <Box sx={{ width: "100%", p: 0, m: 0 }}>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "rgba(255,255,255,0.7)",
            zIndex: 999,
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}

      <Title text={isAdmin ? "GESTIÓN DE PRODUCTOS" : "Panel Principal"} />

      <SearchBar
        open={searchOpen}
        setOpen={setSearchOpen}
        placeholder="Buscar productos..."
        onSearch={handleSearchSubmit}
      />

      <ProductGrid
        items={items}
        isAdmin={isAdmin}
        onEditProduct={openModal}
        onDeleteProduct={deleteProduct}
        onViewDetails={handleViewDetails}
      />

      <ProductModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSave={handleSave}
      />
      {isAdmin && (
        <Box
          sx={{
            position: "fixed",
            bottom: { xs: 16, sm: 24 },
            right: { xs: 16, sm: 24 },
            zIndex: 1000,
          }}
        >
          <FabCustom
            icon={<AddIcon />}
            title="Agregar Producto"
            onClick={() => openModal()}
          />
        </Box>
      )}

      <FeedbackSnackbar alerta={alerta} setAlerta={setAlerta} />
    </Box>
  );
};

export default Home;
