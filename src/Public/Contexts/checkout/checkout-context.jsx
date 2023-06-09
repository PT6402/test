import { createContext } from 'react';

const CheckoutContext = createContext({
  checkoutIsReady: false,
  currentStep: 1,
  email: null,
  shippingAddress: {},
  shippingOption: { standard: true, express: false },
});

export default CheckoutContext;