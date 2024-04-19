import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useAuth();

    return (
        user ? <Route {...rest}>{children}</Route> : <Navigate to="/login" />
    );
};

export default PrivateRoute;