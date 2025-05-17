import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src="public\images\logo.jpg" alt="Logo" width="50" />
      </Link>
      
      <div className="nav-links">
        <Link to="/" className='a'>Accueil</Link>
        <Link to="/cart" className="cart-link">
          Panier
          <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;