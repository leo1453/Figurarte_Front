import React, { useEffect, useState } from "react";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    stock: "",
    categoria: ""
  });

  async function fetchProducts() {
    const res = await fetch("http://localhost:8000/api/products");
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function saveProduct(e) {
    e.preventDefault();

    await fetch("http://localhost:8000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    setForm({
      nombre: "",
      descripcion: "",
      precio: "",
      imagen: "",
      stock: "",
      categoria: ""
    });

    fetchProducts();
  }

  async function deleteProduct(id) {
    await fetch(`http://localhost:8000/api/products/${id}`, {
      method: "DELETE"
    });
    fetchProducts();
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "78.5vh",
        background: "#f8f4ff",
        padding: "20px"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Administrar Productos
        </h2>

        <form onSubmit={saveProduct} style={{ marginBottom: "30px" }}>
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} style={inputStyle} />
          <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} style={inputStyle} />
          <input name="precio" placeholder="Precio" type="number" value={form.precio} onChange={handleChange} style={inputStyle} />
          <input name="imagen" placeholder="URL Imagen" value={form.imagen} onChange={handleChange} style={inputStyle} />
          <input name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} style={inputStyle} />
          <input name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} style={inputStyle} />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "10px",
              border: "none",
              borderRadius: "30px",
              background: "linear-gradient(90deg, #6a11cb, #2575fc)",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Guardar Producto
          </button>
        </form>

        <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.stock}</td>
                <td>{p.categoria}</td>
                <td>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "10px",
                      cursor: "pointer"
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px 15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginBottom: "10px"
};

export default ProductsAdmin;
