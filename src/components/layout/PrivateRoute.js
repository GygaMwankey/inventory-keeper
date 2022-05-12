import React from 'react';
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({auth,children}) => {
    if(auth.isLoading){
        return <div><h2>Loading...</h2></div>;
    }
    else if (!auth.isAuthenticated){
        return <Navigate to="/login"/>;
    }
    else
        return children;
};

export default PrivateRoute;
