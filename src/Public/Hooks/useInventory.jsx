import { useState } from "react";

// import {
//   doc,
//   collection,
//   query,
//   where,
//   setDoc,
//   deleteDoc,
//   documentId,
//   getDocs,
// } from 'firebase/firestore';

// import { db } from '../firebase/config';

import { totalCartAmount } from "../helpers/cart";
import { useAuthContext } from "./useAuthContext";
import { useCartContext } from "./useCartContext";

export const useInventory = () => {
  const { user } = useAuthContext();
  const { dispatch } = useCartContext();

  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  // const inventoryRef = collection(db, 'inventory');
  // const cartRef = doc(db, 'carts', user.uid);

  const checkInventory = async (items) => {
    setError(null);
    setIsLoading(true);
    try {
      const idList = items.map((item) => item.id);

      const skus = [];

      // while (idList.length) {
      //   const batch = idList.splice(0, 10);
      //   // const q = query(inventoryRef, where(documentId(), 'in', [...batch]));
      //   // const inventorySnapshot = await getDocs(q);

      //   inventorySnapshot.forEach((doc) => {
      //     skus.push({ id: doc.id, ...doc.data() });
      //   });
      // }

      let updatedItems = [...items];
      const stockDifference = [];

      const updatedTotalAmount = totalCartAmount(updatedItems);

      dispatch({
        type: "UPDATE_CART",
        payload: {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        },
      });

      if (stockDifference.length > 0) {
        throw Error(
          "There is not enough stock of some products in the cart. The quantities in the cart have been updated.",
          {
            cause: "custom",
          }
        );
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      if (err.cause === "custom") {
        setError({ details: err.message });
      } else {
        setError(err);
      }
      setIsLoading(false);
    }
  };
  return { checkInventory, isLoading, error };
};

export default useInventory;
