import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Outlet, useNavigate } from 'react-router-dom'


// const ProtectedRoute = ({allowedRoles }) => {

//      let {isAuthenticated, isLoading, user} = useSelector((state) => state.auth);

//      if(isLoading) {
//         return <div>Loading...</div>
//      }

//      if(!user || !isAuthenticated ) {
//         return <Navigate to="/" replace />
//      }

//      if(allowedRoles && !allowedRoles.includes(user.role)) {
//         return <Navigate to="/" replace />
//      }


//      return <Outlet />
// }

// export default ProtectedRoute



const ProtectedRoute = ({ allowedRoles }) => {

    const { isAuthenticated, isLoading, user } =
        useSelector((state) => state.auth);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Not logged in
    if ( !user) {
        return <Navigate to="/" replace />;
    }

    // Logged in but wrong role
    // if (allowedRoles && !allowedRoles.includes(user.role)) {
    //     return <Navigate to="/" replace />;
    // }

    if(user.role === "admin" && !allowedRoles.includes("admin")) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};


export default ProtectedRoute;