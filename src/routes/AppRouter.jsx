import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import About from "../views/About";
import Login from "../views/Login";
import Register from "../views/Register";
import AdminPanel from "../views/AdminPanel";
import ProductsAdmin from "../views/ProductsAdmin";
import AdminUsers from "../views/AdminUsers";
import ProductDetail from "../views/ProductDetail";
import Cart from "../views/Cart";
      import Checkout from "../views/Checkout";
import CompraExitosa from "../views/CompraExitosa";


import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
      import Wishlist from "../views/Wishlist";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/producto/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/compra-exitosa" element={<CompraExitosa />} />


<Route path="/checkout" element={<Checkout />} />


<Route path="/wishlist" element={<Wishlist />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <div>Perfil</div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <ProductsAdmin />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;
