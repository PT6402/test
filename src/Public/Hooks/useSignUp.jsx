/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import instance from "../../http";

export const useSignUp = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValue, setDefaultValue] = useState(false);

  const signUp = async ({ name, password_confirmation, email, password,phone }) => {
    setError(null);
    setIsLoading(true);
    setDefaultValue({ name, password_confirmation });

    instance.get("/sanctum/csrf-cookie").then((response) => {
      instance
        .post(`/api/register`, { name, email, password, password_confirmation ,phone})
        .then((res) => {
          if (res.data.status === 200) {
            localStorage.setItem("auth_token", res.data.token);
            localStorage.setItem("auth_name", res.data.username);

            const userData = {
              name,
              email,
              phone,
              isVerified: true,
            };
            dispatch({ type: "LOGIN", payload: { ...userData } });
            navigate("/");
          }
           else if (res.data.validation_errors.email) {
            setError({ details: res.data.validation_errors.email });
          }
           else if (res.data.validation_errors.password) {
            setError({ details: res.data.validation_errors.password });
          }
           else if (res.data.validation_errors.name) {
            setError({ details: res.data.validation_errors.name });
          }

      
        });
    });

   

    setIsLoading(false);
  };

  return { signUp, error, isLoading, defaultValue };
};
