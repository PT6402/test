import { useContext } from 'react';

import CartContext from '../Contexts/cart/cart-context';

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw Error('useCartContext must be inside CartProvider');
  }

  return context;
};
