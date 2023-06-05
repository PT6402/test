import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';
import { useCheckoutContext } from './useCheckoutContext';
import { useCart } from './useCart';
import { useCheckout } from './useCheckout';

// import {
//   writeBatch,
//   doc,
//   collection,
//   query,
//   where,
//   orderBy,
//   getDocs,
//   addDoc,
//   Timestamp,
//   increment,
// } from 'firebase/firestore';

// import { db } from '../firebase/config';

// import { useAuthContext } from './useAuthContext';
// import { useCartContext } from './useCartContext';
// import { useCheckoutContext } from './useCheckoutContext';
// import { useCart } from './useCart';
// import { useCheckout } from './useCheckout';

export const useOrder = () => {
  const { user } = useAuthContext();
  const { items } = useCartContext();
  const { email, shippingAddress, shippingOption } = useCheckoutContext();
  const { deleteCart } = useCart();
  const { deleteCheckoutSession } = useCheckout();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
const [order,setOrder] = useState({...items})
  // const ordersRef = collection(db, 'orders');

  const createOrder = async (paymentInfo) => {
    setError(null);
    setIsLoading(true);
    try {
      const batch = {};

      // for (const item of items) {
      //   let skuRef = {};
      //   batch.update(skuRef, { stock: -item.amount});
      // }

      // await batch.commit();

      // const createdAt = Timestamp.fromDate(new Date());
      let createdAt={}


      await deleteCart();
      await deleteCheckoutSession();

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const getOrders = ()=>order
console.log(order)
  return { createOrder, getOrders, isLoading, error };
};
