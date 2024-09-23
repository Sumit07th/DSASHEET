import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // If no token or role is not admin, redirect to login page
    if (!token || role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    // If the user is an admin, render the requested component
    return children;
};

export default AdminRoute;
