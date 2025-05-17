import { useState } from "react";
import { useCart } from "../context/useCart";
import ItemCard from "../components/ItemCard";
import { products } from "../data/data";
import "../App.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { dispatch } = useCart();

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ItemCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Home;
