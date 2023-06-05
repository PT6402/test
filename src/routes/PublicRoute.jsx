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
import AuthProvider from "../Public/Contexts/auth/AuthProvider";
import CartProvider from "../Public/Contexts/cart/CartProvider";
import ForgetPassword from "../Public/Pages/ForgetPassword";
import ResetPassword from "../Public/Pages/ResetPassword";

import Products from "../Public/Pages/Products/index3.jsx";
import ProductProvider from "../Public/Contexts/product/ProductProvider";
import CheckoutProvider from "../Public/Contexts/checkout/CheckoutProvider";

export default function PublicRoute() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/category/:id" element={<Collections />} />
            <Route
              path="/product/:slug/:url"
              element={
                <ProductProvider>
                  <Products />
                </ProductProvider>
              }
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/address" element={<Addresses />} />
            <Route path="/cart" element={<Cart />} />
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
             <Route
                  path="/checkout"
                  element={
                    <CheckoutProvider>
                      <Checkout />
                    </CheckoutProvider>
                  }
                />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
