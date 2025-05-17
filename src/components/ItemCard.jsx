import { Link } from 'react-router-dom';

const ItemCard = ({ product, addToCart }) => {
  return (
    <div className="item-card">
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
        />
      <table className="item-table">
        <tr>
          <td className="item-name"><h3>{product.name}</h3></td>
          <td className="item-price"><p className="price">DA {product.price.toLocaleString()}</p></td>
        </tr>
      </table>
      </Link>
      <button onClick={() => addToCart(product)}>Ajouter au panier</button>
      {product.views < 10 && <span className="new-badge">Nouveau !</span>}
    </div>
  );
};

export default ItemCard;