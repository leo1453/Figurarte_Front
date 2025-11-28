import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Mis Favoritos ❤️
      </h1>

      {wishlist.length === 0 && (
        <p style={{ textAlign: "center", color: "#666" }}>
          No tienes productos guardados aún.
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {wishlist.map((fav) => (
          <ProductCard
            key={fav.id}
            id={fav.product.id}
            name={fav.product.nombre}
            price={fav.product.precio}
            image={fav.product.imagen}
          />
        ))}
      </div>
    </div>
  );
}
