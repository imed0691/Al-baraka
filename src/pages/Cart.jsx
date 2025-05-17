import { useCart } from "../context/useCart";
import "../App.css";

const Cart = () => {
  const { cart, dispatch } = useCart();

  const handleCheckout = () => {
    alert("Merci pour votre commande !");
    dispatch({ type: "CLEAR_CART" });
  };

  const handleQuantityChange = (productId, action) => {
    dispatch({ type: action, payload: productId });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Votre Panier</h1>

      {cart.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <div className="cart-item-row">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, "DECREMENT_QUANTITY")
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, "INCREMENT_QUANTITY")
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-row">
                  <p className="cart-item-price">
                    DA {item.price.toLocaleString()}
                  </p>
                  <button
                    className="remove-button"
                    onClick={() => handleQuantityChange(item.id, "REMOVE_ITEM")}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <h2>Total : DA {total.toLocaleString()}</h2>
            <button className="checkout-button" onClick={handleCheckout}>
              Passer la commande
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
