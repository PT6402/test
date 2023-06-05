import { createContext } from 'react';

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  totalPrice: 0,
});

export default CartContext;
