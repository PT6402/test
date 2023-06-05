/* eslint-disable react/prop-types */
import { useReducer, useEffect } from "react";

import CartContext from "./cart-context";
import { useAuthContext } from "../../Hooks/useAuthContext";
import instance from "../../../http";

const initialState = {
  items: [],
  totalAmount: 0,
  totalPrice: 0,
  cartIsReady: false,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "CART_IS_READY": {
      return {
        ...state,
        cartIsReady: true,
      };
    }
    case "UPDATE_CART": {
      return {
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        totalPrice: action.payload.totalPrice,
        cartIsReady: true,
      };
    }
    case "DELETE_CART": {
      return {
        ...initialState,
        cartIsReady: true,
      };
    }

    default: {
      return state;
    }
  }
};

const CartProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (user) {
      const getCart = async () => {
        try {
          await instance.post("api/view-cartitem").then((res) => {
            if (res.data.status === 200) {
              const cartData = res.data;
              dispatch({
                type: "UPDATE_CART",
                payload: { ...cartData },
              });
            } else {
              dispatch({
                type: "CART_IS_READY",
              });
            }
          });
        } catch (err) {
          console.log(err);
        }
      };
      getCart();
    }
  }, [user]);

  console.log("cart-context", state);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
