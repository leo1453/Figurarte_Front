import { useEffect, useState } from "react";
import { buscarFiguras } from "../api/amiami";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [figuras, setFiguras] = useState([]);

  useEffect(() => {
    // Puedes cambiar "rem" por "miku", "saber", etc.
    buscarFiguras("rem").then((data) => {
      setFiguras(data);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>FigurArte - Catálogo</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {figuras.map((item) => (
          <ProductCard key={item.gcode} item={item} />
        ))}
      </div>
    </div>
  );
}
