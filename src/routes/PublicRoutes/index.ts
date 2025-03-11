import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { DASHBOARD_URL } from '../../constants/urls';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const navigate = useNavigate(); 
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (token) {
      navigate(DASHBOARD_URL, { replace: true });
    }
  }, [token, navigate]);

  if (token) {
    return null;
  }

  return children
};

export default PublicRoute;
