import { useContext } from 'react';
import CheckoutContext from './../Contexts/checkout/checkout-context';




export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw Error('useCheckoutContext must be inside CheckoutProvider');
  }

  return context;
};
