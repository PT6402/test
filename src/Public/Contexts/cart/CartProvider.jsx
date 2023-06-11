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
  discount: [],
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
        discount: action.payload.discount,
        cartIsReady: true,
      };
    }
    case "UPDATE_DISCOUNT": {
      return {
        ...state,
        discount: action.payload.discount,
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
        const getProductsByColor = (items) => {
          const products = [];

          for (const item of items) {
            for (const colorSize of item.colorSizes) {
              products.push({
                id: item.id,
                model: item.product_name,
                // product_slug: item.product_slug,
                price: item.product_price,
                description: item.product_description,
                // type: item.product_type,
                material: item.product_material,
                collection: item.category_name,
                type: item.subcategory_name,
                color: colorSize.color_name,
                size: colorSize.sizes[0].size_name,
                images: colorSize.images,
                url: colorSize.url,
                total_price: colorSize.total_price,
                amount: colorSize.sizes[0].quantity,
                productId: item.id,
                thumbnail: colorSize.images[0].url,
              });
            }
          }
          console.log(products);
          return products;
        };
        try {
          await instance.post("api/view-cartitem").then((res) => {
            if (res.data.status === 200) {
              if (res.data.totalAmount) {
                const cartData = res.data;
                const data = getProductsByColor(res.data.items);
                dispatch({
                  type: "UPDATE_CART",
                  payload: {
                    ...cartData,
                    items: data,
                    discount: res.data.discount,
                    isTotalPrice: res.data.totalPrice,
                  },
                });
                console.log(res.data);
              }
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
