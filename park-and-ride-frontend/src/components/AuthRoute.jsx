import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AuthRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    toast.info('You are already logged in');
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthRoute;