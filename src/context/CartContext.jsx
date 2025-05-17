import {useReducer, useEffect } from 'react';
import { CartContext } from './cartContext';

const initCart = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Erreur de lecture du panier:", error);
    return [];
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);

    case 'INCREMENT_QUANTITY':
      return state.map(item => 
        item.id === action.payload 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );

    case 'DECREMENT_QUANTITY':
      return state.map(item => 
        item.id === action.payload 
          ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
          : item
      );
    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], initCart);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Erreur de sauvegarde du panier:", error);
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};


