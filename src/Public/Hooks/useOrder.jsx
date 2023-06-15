import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useCartContext } from "./useCartContext";
import { useCart } from "./useCart";
import { useCheckoutContext } from "./useCheckoutContext";
import { useCheckout } from "./useCheckout";
import instance from "../../http";

export const useOrder = () => {
  const { user } = useAuthContext();
  const { items } = useCartContext();
  const { email, shippingAddress, shippingOption } = useCheckoutContext();
  const { deleteCart } = useCart();
  const { deleteCheckoutSession } = useCheckout();

  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReLoad] = useState(false);
  const [error, setError] = useState(null);

  // const ordersRef = collection(db, 'orders');

  const createOrder = async (paymentInfo) => {
    setError(null);
    setIsLoading(true);
    try {
      console.log({
        shippingAddress,
        shippingOption,
        paymentInfo,
      });

      instance.post("api/check-out", {
        address: shippingAddress.address,
        city: shippingAddress.city,
        province: shippingAddress.province,
        name: shippingAddress.name,
        phone: shippingAddress.phone,
        standard: shippingOption.standard ? 1 : 0,
        express: shippingOption.express ? 1 : 0,
      });

      await deleteCart();
      await deleteCheckoutSession();

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };
  const createOrderCard = async (paymentInfo) => {
    setError(null);
    setIsLoading(true);
    try {
      // console.log({
      //   address: paymentInfo.shippingAddress.address,
      //   city: paymentInfo.shippingAddress.city,
      //   province: paymentInfo.shippingAddress.province,
      //   name: paymentInfo.shippingAddress.name,
      //   phone: paymentInfo.shippingAddress.phone,
      //   standard: paymentInfo.shippingOption.standard,
      //   express: paymentInfo.shippingOption.express,
      // });

    instance.post("api/check-out", {
        address: paymentInfo.shippingAddress.address,
        city: paymentInfo.shippingAddress.city,
        province: paymentInfo.shippingAddress.province,
        name: paymentInfo.shippingAddress.name,
        phone: paymentInfo.shippingAddress.phone,
        standard: paymentInfo.shippingOption.standard ? 1 : 0,
        express: paymentInfo.shippingOption.express ? 1 : 0,
      });

      await deleteCart();
      await deleteCheckoutSession();
      localStorage.removeItem('order_user')

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const getOrders = async () => {
    setError(null);

    try {
      const response = await instance.post("api/list-order");
      if (response) {
        // console.log(response)
        // let data = response.data.orders

        // data={...data,}
        return response.data.orders;
      }
      // return orders;
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  const cancelOrder = async (id) => {
    setError(null);

    try {
      await instance.post("api/cancel-order", { id }).then((res) => {
        if (res.data.status) {
          setReLoad(true);
        }
      });
      setReLoad(false);
      // return orders;
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return {
    createOrder,
    getOrders,
    cancelOrder,
    isLoading,
    error,
    reload,
    createOrderCard,
  };
};
