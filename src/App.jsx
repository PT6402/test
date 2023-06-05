import { Route, Routes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";



function App() {
  return (
    <Routes>
      <Route exact path="/*" element={<PublicRoute />} />
      <Route path="/admin/*" element={<PrivateRoute />} />
    </Routes>
  );
}

export default App
