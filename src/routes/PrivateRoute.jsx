import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if(!isAuthenticated) {
    return <Navigate to="/login" replace={true} />
  }
  return children;
}

export default PrivateRoute