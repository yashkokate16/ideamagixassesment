import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from "react-router-dom";





// const AuthRoute = () => {


//   let {isAuthenticated, isLoading, user} = useSelector((state) => state.auth);

//   if(isLoading) {
//     return <div>Loading...</div>
//   }

//   if(isAuthenticated && user) {

//     if(user.role === "admin") {
//       return <Navigate to="/admin" />
//     }

//     if(user.role === "instructor") {
//       return <Navigate to="/instructor" />
//     }

//   }


    


//   return <Outlet/>


// }

// export default AuthRoute



const AuthRoute = () => {

    const { isAuthenticated, isLoading, user } =
        useSelector((state) => state.auth);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated && user) {

        if (user.role === "admin") {
            return <Navigate to="/admin" />;
        }

        if (user.role === "instructor") {
            return <Navigate to="/instructor" />;
        }
    }

    return <Outlet />;
};


export default AuthRoute;