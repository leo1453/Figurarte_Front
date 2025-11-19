export default function ProductCard({ item }) {
  return (
    <div className="product-card">
      <img src={item.image} className="product-img" />
      <h3 className="product-name">{item.name}</h3>
      <p className="product-price">${item.price}</p>
    </div>
  );
}
