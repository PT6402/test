/* eslint-disable react/prop-types */
import { useEffect, useReducer } from "react";

import AuthContext from "./auth-context";
import instance from "../../../http";

const initialState = {
  user: null,
  name: null,
  email: null,
  phone: null,
  addresses: [],
  isVerified: false,
  authIsReady: false,
  role_as: 0,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_IS_READY": {
      return {
        user: action.payload.user,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone || null,
        addresses: action.payload.addresses || [],
        isVerified: true,
        authIsReady: true,
        role_as: action.payload.role_as,
      };
    }

    case "LOGIN": {
      return {
        ...state,
        user: action.payload.user,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone || null,
        addresses: action.payload.addresses || [],
        isVerified: true,
        role_as: action.payload.role_as,
        authIsReady: true,
      };
    }

    case "LOGOUT": {
      return {
        ...initialState,
      };
    }

    case "UPDATE_USER": {
      return {
        ...state,
        ...action.payload,
      };
    }

    case "UPDATE_ADDRESSES": {
      return {
        ...state,
        addresses: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      const check = async () => {
        const res = await instance.get("api/currentLogin");
        if (res.data.status == 200) {
          const userData = res.data.user;
          dispatch({
            type: "AUTH_IS_READY",
            payload: { ...userData },
          });
        } else {
          console.log(res.data);
        }
    };
    return () => check();
}
  }, []);

  console.log("auth-context", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
