import React, { useEffect, useState } from "react";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

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


  async function loadPokemonCards() {
    const res = await fetch("/tcg/cards?pageSize=30");
    const data = await res.json();

    const cards = data.data.map(card => ({
      nombre: card.name,
      descripcion:
        card.supertype + " / " + (card.subtypes?.join(", ") || ""),
      precio: 99,
      imagen: card.images.small,
      stock: 10,
      categoria: "Pokemon Card"
    }));

    setProducts(cards); 
  }

  async function saveImportedCard(card) {
    await fetch("http://localhost:8000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(card)
    });

    alert("Producto agregado desde Pokémon API");
    fetchProducts();
  }


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function saveProduct(e) {
    e.preventDefault();

    if (editingId) {
      await fetch(`http://localhost:8000/api/products/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      setEditingId(null);
    } else {
      await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
    }

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

  function loadProduct(p) {
    setEditingId(p.id);
    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      imagen: p.imagen,
      stock: p.stock,
      categoria: p.categoria
    });
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

        {/* Botón para importar cartas Pokémon */}
        <button
          onClick={loadPokemonCards}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            border: "none",
            borderRadius: "30px",
            background: "linear-gradient(90deg, #ffcb05, #3b4cca)",
            color: "white",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Importar Cartas Pokémon
        </button>

        {/* FORMULARIO */}
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
              background: editingId ? "orange" : "linear-gradient(90deg, #6a11cb, #2575fc)",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            {editingId ? "Actualizar Producto" : "Guardar Producto"}
          </button>
        </form>

        {/* TABLA */}
        <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id || p.nombre} style={{ borderBottom: "1px solid #ddd" }}>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.stock}</td>
                <td>{p.categoria}</td>
                <td style={{ display: "flex", gap: "8px" }}>
                  
                  {/* Editar */}
                  {p.id && (
                    <button
                      onClick={() => loadProduct(p)}
                      style={{
                        background: "#2575fc",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        cursor: "pointer"
                      }}
                    >
                      Editar
                    </button>
                  )}

                  {/* Guardar carta importada */}
                  {!p.id && (
                    <button
                      onClick={() => saveImportedCard(p)}
                      style={{
                        background: "#6a11cb",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        cursor: "pointer"
                      }}
                    >
                      Guardar
                    </button>
                  )}

                  {/* Eliminar */}
                  {p.id && (
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
                  )}

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
