import { useState } from "react";

import { useAuthContext } from "./useAuthContext";

import { useNavigate } from "react-router-dom";
import instance from "../../http";

export const useLogout = () => {
  const navigate = useNavigate();
  const { dispatch: dispatchAuthAction } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setError(null);
    setIsLoading(true);
    try {
      instance.post(`/api/logout`).then((res) => {
        if (res.data.status === 200) {
          localStorage.removeItem("auth_token");
        
          // swal("Success",res.data.message,"success");
          navigate("/");
        }
      });
      dispatchAuthAction({ type: "LOGOUT" });
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};
