import { Route, Routes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import AuthProvider from "./Public/Contexts/auth/AuthProvider";
import CartProvider from "./Public/Contexts/cart/CartProvider";

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/*"
        element={
          <AuthProvider>
            <CartProvider>
              <PublicRoute />
            </CartProvider>
          </AuthProvider>
        }
      />
      <Route path="/admin/*" element={<PrivateRoute />} />
    </Routes>
  );
}

export default App;
