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
  const { dispatch: dispatchCartAction } = useCartContext()

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
                let cartData = {};
                const cartResponse = await instance.post(`api/view-cartitem`);
                if (cartResponse.data.totalAmount) {
                    dispatchCartAction({
                        type: 'UPDATE_CART',
                        payload: { ...cartData },
                      });
                }

                console.log(cartData);
                let userData = {};
                if (loginResponse.data.role === "admin") {
                    userData = {
                        user: loginResponse.data.username,
                        name: loginResponse.data.username,
                        email: loginResponse.data.email,
                        phone: loginResponse.data.phone,
                        addresses:loginResponse.data.address,
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
                        addresses:loginResponse.data.address,
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
                    window.location.href = "http://172.16.0.208:8000/";
                } else {
                    navigate("/");
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
