/* eslint-disable no-unused-vars */
import { useState } from "react";
import { totalCartAmount } from "../helpers/cart";
import { useCartContext } from "./useCartContext";
import { useAuthContext } from "./useAuthContext";
import instance from "../../http";
import { useProductContext } from "./useProductContext";
// import ProductContext from "../Contexts/product/product-context";

export const useCart = () => {
  const { selectedVariant } = useProductContext();
  console.log(selectedVariant);

  const { items, totalAmount, dispatch } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const getCurrentStock = async (itemId) => {
    instance.post("api/stock", itemId).then((res) => {
      return res.data.stock;
    });
  };
  const addItem = async (itemToAdd) => {
    setError(null);
    setIsLoading(true);
    try {
      console.log(itemToAdd);
      const itemInCartIndex = items.findIndex(
        (item) => item.id === itemToAdd.id
      );
      const itemInCart = items[itemInCartIndex];
      let updatedItems = [...items];
console.log(itemInCart)
     

      const data = {
        product_id: itemToAdd.productId,
        color_name: itemToAdd.color,
        size_name: itemToAdd.size,
      };
      let stock = await getCurrentStock(data);
      let noStock;
      let stockWasUpdated;

      if (stock <= 0) {
        if (itemInCart) {
          updatedItems = updatedItems.filter(
            (item) => item.id !== itemInCart.id
          );
          noStock = true;
        } else {
          throw Error("There is no more stock of this product.", {
            cause: "custom",
          });
        }
      } else {
        if (itemInCart) {
          if (itemInCart.amount > stock) {
            itemInCart.amount = stock - 1;
            stockWasUpdated = true;
          }

          if (itemInCart.amount === stock) {
            throw Error("All available stock of this product is in the cart.", {
              cause: "custom",
            });
          }

          const updatedItem = {
            ...itemInCart,
            amount: itemInCart.amount + 1,
          };
          updatedItems[itemInCartIndex] = updatedItem;
        } else {
          const addedItem = {
            ...itemToAdd,
            amount: 1,
          };
          updatedItems.push(addedItem);
        }
      }
      console.log();
      const updatedTotalAmount = totalCartAmount(updatedItems);

      if (updatedTotalAmount === 0) {
        // await deleteDoc(cartRef);

        dispatch({
          type: "DELETE_CART",
        });
      } else {
        // await setDoc(cartRef, {
        //   items: updatedItems,
        //   totalAmount: updatedTotalAmount,
        // });

        dispatch({
          type: "UPDATE_CART",
          payload: {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
          },
        });
        const data = {
          product_id: itemToAdd.productId,
          color_name: itemToAdd.color,
          size_name: itemToAdd.size,
        };
        console.log(data)
        instance.post("api/add-to-cart", data);
        console.log({
          updatedItems,
          updatedTotalAmount,
        });
      }

      if (noStock) {
        throw Error(
          "There is no more stock of this product. The quantities in the cart have been updated.",
          { cause: "custom" }
        );
      }

      if (stockWasUpdated) {
        throw Error(
          "There are fewer units available than the quantities in the cart. The quantities in the cart have been updated.",
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
        console.log("aca");
        setError(err);
      }
      setIsLoading(false);
    }
  };

  const removeItem = async (itemToRemove) => {
    setError(null);
    setIsLoading(true);
    try {
      const itemInCartIndex = items.findIndex(
        (item) => item.id === itemToRemove.id
      );
      const itemInCart = items[itemInCartIndex];

      let updatedItems = [...items];

      // const { stock } = await getCurrentStock(itemToRemove.id);
      let { stock } = {};
      let noStock;
      let stockWasUpdated;

      if (itemInCart.amount === 1) {
        updatedItems = items.filter((item) => item.id !== itemInCart.id);
      } else {
        if (stock <= 0) {
          updatedItems = updatedItems.filter(
            (item) => item.id !== itemInCart.id
          );
          noStock = true;
        } else if (stock < itemInCart.amount) {
          const updatedItem = {
            ...itemInCart,
            amount: stock,
          };

          updatedItems[itemInCartIndex] = updatedItem;

          stockWasUpdated = true;
        } else {
          const updatedItem = { ...itemInCart, amount: itemInCart.amount - 1 };
          updatedItems[itemInCartIndex] = updatedItem;
        }
      }

      const updatedTotalAmount = totalCartAmount(updatedItems);


      if (updatedTotalAmount === 0) {
      

        dispatch({
          type: "DELETE_CART",
        });
        instance.post("api/delete-cart");
      } else {
       

        dispatch({
          type: "UPDATE_CART",
          payload: {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
          },
        });
        const data = {
          product_id: itemToRemove.productId,
          color_name: itemToRemove.color,
          size_name: itemToRemove.size,
        };
        instance.post("api/remove-to-cart", data);

      }

      if (noStock) {
        throw Error(
          "There is no more stock of this product. The quantities in the cart have been updated.",
          { cause: "custom" }
        );
      }

      if (stockWasUpdated) {
        throw Error(
          "There are fewer units available than the quantities in the cart. The quantities in the cart have been updated.",
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

  const deleteItem = async (itemToDelete) => {
    setError(null);
    setIsLoading(true);
    try {
      const updatedTotalAmount = totalAmount - itemToDelete.amount;

      const updatedItems = items.filter((item) => item.id !== itemToDelete.id);

      // const cartRef = doc(db, 'carts', user.uid);
console.log(updatedTotalAmount)
      if (updatedTotalAmount === 0) {
        // await deleteDoc(cartRef);

        dispatch({
          type: "DELETE_CART",
        });
        instance.post("api/delete-cart");
      } else {
        // await setDoc(cartRef, {
        //   items: updatedItems,
        //   totalAmount: updatedTotalAmount,
        // });

        dispatch({
          type: "UPDATE_CART",
          payload: {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
          },
        });
        const data = {
          product_id: itemToDelete.productId,
          color_name: itemToDelete.color,
          size_name: itemToDelete.size,
        };
        instance.post("api/delete-cartItem", data);
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const deleteCart = async () => {
    // const cartRef = doc(db, 'carts', user.uid);
    // await deleteDoc(cartRef);
    dispatch({
      type: "DELETE_CART",
    });
  };

  return { addItem, removeItem, deleteItem, deleteCart, isLoading, error };
};
