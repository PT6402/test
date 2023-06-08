/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

// import axiosClient from "../http";

import instance from "../../http";
import { useCartContext } from "./useCartContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch: dispatchCartAction } = useCartContext();
  const getProductsByColor = (items) => {
    const products = [];

    for (const item of items) {
      for (const colorSize of item.colorSizes) {
        products.push({
          id: item.id,
          product_name: item.product_name,
          product_slug: item.product_slug,
          product_price: item.product_price,
          product_description: item.product_description,
          product_type: item.product_type,
          product_material: item.product_material,
          category_name: item.category_name,
          subcategory_name: item.subcategory_name,
          color_name: colorSize.color_name,
          sizes: colorSize.sizes,
          images: colorSize.images,
          url: colorSize.url,
          total_price: colorSize.total_price,
        });
      }
    }

    return products;
  };
  const login = async ({ email, password }) => {
    setError(null);
    setIsLoading(true);
    try {
      await instance.get("/sanctum/csrf-cookie");
      const loginResponse = await instance.post(`api/login`, {
        email,
        password,
      });
      if (loginResponse.data.status === 200) {
        localStorage.setItem("auth_token", loginResponse.data.token);
        localStorage.setItem("auth_name", loginResponse.data.username);
      

        let userData = {};
        if (loginResponse.data.role === "admin") {
          userData = {
            user: loginResponse.data.username,
            name: loginResponse.data.username,
            email: loginResponse.data.email,
            phone: loginResponse.data.phone,
            addresses: loginResponse.data.address,
            isVerified: true,
            authIsReady: true,
            role_as: 2,
          };
        } else {
          userData = {
            user: loginResponse.data.username,
            name: loginResponse.data.username,
            email: loginResponse.data.email,
            phone: loginResponse.data.phone,
            addresses: loginResponse.data.address,
            isVerified: true,
            authIsReady: true,
            role_as: 0,
          };
        }

        console.log(loginResponse.data);

        dispatch({
          type: "LOGIN",
          payload: { ...userData },
        });
        if (loginResponse.data.role === "admin") {
          // window.location.href = "http://172.16.0.208:8000/";
          navigate("/admin");
        } else {
          navigate("/");
        }
        const cartResponse = await instance.post(`api/view-cartitem`);
        if (cartResponse.data.totalAmount>0) {
          const cartData = cartResponse.data;
          const data = getProductsByColor(cartResponse.data.items);
          dispatchCartAction({
            type: "UPDATE_CART",
            payload: { ...cartData, items: data },
          });
        } else {
          console.log(cartData);
        }
      } else if (loginResponse.data.status === 401) {
        setError({ details: "Wrong username or password" });
      } else {
        console.log(loginResponse.data);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
