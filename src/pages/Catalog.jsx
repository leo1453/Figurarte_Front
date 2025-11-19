import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import fakeProducts from "../data/fakeProducts";

export default function Catalog() {
  return (
    <div className="catalog-container">
      <Sidebar />

      <main className="catalog-main">
        <h1 className="catalog-title">Catálogo</h1>

        <div className="grid-products">
          {fakeProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
