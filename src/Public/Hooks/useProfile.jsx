import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import instance from "../../http";

export const useProfile = () => {
  const { dispatch } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const editProfile = async ({ name, phone = null }) => {
    setError(null);
    setIsLoading(true);
    try {
      await instance
        .post("api/update-phone-name", { name, phone })
        .then((res) => {
          if (res.data.status == 200) {
            dispatch({
              type: "UPDATE_USER",
              payload: { name, phone },
            });

            setIsLoading(false);
          }
        });
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };
  const ChangePassword = async ({
    newPass,
    oldPass,
    password_confirmation,
  }) => {
    setError(null);
    setIsLoading(true);
    try {
      await instance
        .post("api/resetPassword", {
            oldPass,
            newPass,
            password_confirmation,
        })
        .then((res) => {
          if (res.data.status == 200) {
            localStorage.removeItem("auth_token");
            localStorage.setItem("auth_token", res.data.token);
            setIsLoading(false);
          } else if (res.data.error) {
            setError(res.data.error);
            setIsLoading(false);

          }
        });
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { editProfile, isLoading, error, ChangePassword };
};
