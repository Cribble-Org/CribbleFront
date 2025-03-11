// PrivateRoute.tsx
import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../../constants/urls';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate(LOGIN_URL, { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (children)
};

export default PrivateRoute;
