import React from 'react';
import { Navigate, useLocation} from "react-router-dom";
import {getCookie} from '../utils/Cookies';
import {getLocalStorage} from '../utils/Storage'

const PrivateRoute = ({ children }) => {
  let refresh = getCookie('refresh');
  let access = getLocalStorage('access');
  let location = useLocation();

  if (!(refresh && access)) {
    // redirecting to signin page
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;