import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";


// import MainBoard from "./layouts/admin/MainBoard";
// import MasterLayout from './layouts/admin/MasterLayout';
// import swal from "sweetalert";
import instance from "../http";
import Layouts from "../Private/Layouts";

function AdminPrivateRoute() {
  const navigate = useNavigate();

  const [Authenticated, setAuthenticated] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    instance.get(`/api/checkingAuthenticated`).then((res) => {
      if (res.status === 200) {
        setAuthenticated(true);
      }
      setloading(false);
    });

    return () => {
      setAuthenticated(false);
    };
  }, []);

  instance.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(err) {
      if (err.response.status === 401) {
        // swal("Unauthorized", err.response.data.message, "warning");
        navigate("/");
      }
      return Promise.reject(err);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 403) {
        // Access Denied
        // swal("Forbidden", error.response.data.message, "warning");
        navigate("/403");
      } else if (error.response.status === 404) {
        //Page Not Found
        // swal("404 Error", "Url/Page Not Found", "warning");
        history.push("/404");
      }
      return Promise.reject(error);
    }
  );

  if (loading) {
    return <div className="w-full vh-100 flex justify-center items-center"><h1 className="text-3xl">Loading...</h1></div>;
  }

  return Authenticated ? <Layouts /> : <Navigate to={"/account/login"} />;
}

export default AdminPrivateRoute;