import { Route, Routes } from "react-router-dom";
import Layout from "../Public/Layouts";
import Home from "../Public/Pages/Home";
import Collections from "../Public/Pages/Collections/index.jsx";
import Checkout from "../Public/Pages/Checkout";
import Account from "../Public/Pages/Account";
import Addresses from "../Public/Pages/Addresses";
import Cart from "../Public/Pages/Cart";
import Signup from "../Public/Pages/Signup";
import Login from "../Public/Pages/Login";

import ForgetPassword from "../Public/Pages/ForgetPassword";
import ResetPassword from "../Public/Pages/ResetPassword";

import Products from "../Public/Pages/Products/index3.jsx";
import ProductProvider from "../Public/Contexts/product/ProductProvider";
import CheckoutProvider from "./../Public/Contexts/checkout/CheckoutProvider";
import ProtectedRoutes from "../Public/Layouts/ProtectRoute";
import { useEffect } from "react";
import instance from "../http";
// import { useProductContext } from "../Public/Hooks/useProductContext";
import CryptoJS from "crypto-js";
import LayoutCollection from "../Public/Pages/Collections/Layout";
// import Favorite from "../Public/Pages/Favorite";
export default function PublicRoute() {
  useEffect(() => {
    instance.get("api/list-category").then((res) => {
      if (res.data.status == 200) {
        const encryptedCategory = CryptoJS.AES.encrypt(
          JSON.stringify(res.data.category),
          "secret_key"
        ).toString();

        localStorage.removeItem("category");
        localStorage.setItem("category", encryptedCategory);
      }
    });
    instance.get("api/list-subcategory").then((res) => {
      if (res.data.status == 200) {
        const encryptedSubcategory = CryptoJS.AES.encrypt(
          JSON.stringify(res.data.subcategories),
          "secret_key"
        ).toString();
        localStorage.removeItem("subcategory");
        localStorage.setItem("subcategory", encryptedSubcategory);
      }
    });
    instance.get("api/list-product").then((res) => {
      if (res.data.status == 200) {
        const encryptedProduct = CryptoJS.AES.encrypt(
          JSON.stringify(res.data.products),
          "secret_key"
        ).toString();
        localStorage.removeItem("product");
        localStorage.setItem("product", encryptedProduct);
      }
    });
  }, []);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/category/:id" element={<LayoutCollection />} />
        <Route path="/category/:id/:sub" element={<LayoutCollection />} />
        <Route
          path="/product/:slug/:url"
          element={
            <ProductProvider>
              <Products />
            </ProductProvider>
          }
        />

        <Route element={<ProtectedRoutes needAuth={true} />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route element={<ProtectedRoutes needAuth={true} />}>
          <Route path="/account/signup" element={<Signup />} />
          <Route path="/account/login" element={<Login />} />

          <Route
            path="/account/login/forget-password"
            element={<ForgetPassword />}
          />
          <Route
            path="/account/login/reset-password"
            element={<ResetPassword />}
          />
        </Route>

        {/* <Route
          path="/favorite"
          element={<Favorite />}
        /> */}
        <Route element={<ProtectedRoutes needAuth={true} />}>
          <Route
            path="/checkout"
            element={
              <CheckoutProvider>
                <Checkout />
              </CheckoutProvider>
            }
          />
          <Route path="/account" element={<Account />} />
          <Route path="/account/success" element={<Account />} />
          <Route path="/account/cancel" element={<Account />} />
          <Route path="/account/address" element={<Addresses />} />
        </Route>
      </Route>
    </Routes>
  );
}
