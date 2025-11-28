import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

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
        {wishlist.map((fav) => {
          const product = fav.product;

          return (
            <ProductCard
              key={fav.id}
              id={product.id}
              name={product.nombre}
              price={product.precio}
              image={product.imagen}
              onClick={() =>
                navigate(`/producto/${product.id}`, {
                  state: product,
                })
              }
              isAdmin={false} // PARA QUE NO SALGA BOTÓN DE ADMIN
            />
          );
        })}
      </div>
    </div>
  );
}
