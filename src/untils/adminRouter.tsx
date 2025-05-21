import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  isAdmin: boolean;
  children: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ isAdmin, children }) => {
  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;
