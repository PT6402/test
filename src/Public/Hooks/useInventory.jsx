import { useState } from "react";

import { useCartContext } from "./useCartContext";

export const useInventory = () => {
  const { dispatch, totalAmount ,discount,totalPrice} = useCartContext();

  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const checkInventory = async (items) => {
    setError(null);
    setIsLoading(true);
    try {
      dispatch({
        type: "UPDATE_CART",
        payload: {
          items: items,
          totalAmount,
          discount,totalPrice
        },
      });

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
