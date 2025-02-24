import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext({
  isOpen: false,
  toggleCart: () => {},
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  total: 0,
});

export function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleCart = () => setIsOpen(prev => !prev);

  const addToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price;
  }, 0);

  return (
    <CartContext.Provider value={{
      isOpen,
      toggleCart,
      cartItems,
      addToCart,
      removeFromCart,
      total,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);