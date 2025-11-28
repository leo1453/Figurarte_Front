import React from "react";
import * as XLSX from "xlsx";
import ButtonCustom from "./ButtonCustom";

export default function ImportExcelButton({ onImport }) {

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const products = rows.map((row) => ({
    nombre: row[0] || "",
    descripcion: row[1] || "",
    precio: parseFloat(row[2]) || 0,
    imagen: row[3] || "",
    stock: parseInt(row[4]) || 0,
    categoria: row[5] || "",
    }));

    for (const product of products) {
      try {
        await fetch("http://localhost:8000/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
      } catch (error) {
        console.error("Error al importar producto:", product.nombre, error);
      }
    }
    alert("Productos importados correctamente");
    onImport && onImport();
  };

  return (
    <label>
      <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFile} style={{ display: "none" }} />
      <ButtonCustom title="Importar productos de Excel" variant="success" />
    </label>
  );
}
