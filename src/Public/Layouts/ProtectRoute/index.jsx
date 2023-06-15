/* eslint-disable react/prop-types */
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';


const ProtectedRoutes = ({ needAuth }) => {
  const { isVerified } = useAuthContext();
  const { pathname, state } = useLocation();
console.log(state)
  // TODO: SI EL USUARIO HACE LOGOUT TIENE QUE TERMINAR EN HOME Y NO EN LOGIN

  switch (needAuth) {
    case true:
      // if (isVerified) {
      //   return <Outlet />;
      // }

      // if (isVerified) {
      //   return <Navigate to="/account/login" state={pathname} />;
      // }
      if (!isVerified) {
        if (state === '/cart') {
          return <Navigate to={'/account/login'} />;
        } else if (state === '/account') {
          return <Navigate to={'/account/login'} />;
        }
        return  <Outlet />;
      }
      if (isVerified) {
        if (state === '/account/login') {
          return <Navigate to={'/account'} />;
        } 
        return  <Outlet />;
      }
      break;
    case false:
      if (!isVerified) {
        return <Outlet />;
      }

      if (isVerified) {
        if (state === '/cart') {
          return <Navigate to={state} />;
        } else if (state === '/account') {
          return <Navigate to={state} />;
        }
        return <Navigate to="/" />;
      }

      break;
    default:
      return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
