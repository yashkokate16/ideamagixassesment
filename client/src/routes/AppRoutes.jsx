import React from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Login from '../features/auth/ui/pages/login.jsx'
import Register from '../features/auth/ui/pages/Register.jsx'
import Admin from '../features/admin/ui/pages/Admin.jsx'
import ProtectedRoute from '../protectedRoute/ProtectedRoute.jsx'
import AuthRoute from "../protectedRoute/AuthRoute.jsx"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getMe } from '../features/auth/state/authThunk.jsx'
import Courses from '../features/courses/ui/pages/courses.jsx'
import Lectures from '../features/lectures/ui/pages/lectures.jsx'
import CreateCourse from '../features/courses/ui/components/CreateCourse.jsx'
import EditCourse from '../features/courses/ui/pages/EditCourse.jsx'
import Instructors from '../features/instructors/ui/pages/Instructors.jsx'
import CreateLecture from '../features/lectures/ui/components/CreateLecture.jsx'
import InstructorLectures from '../features/instructors/ui/pages/InstructorLectures.jsx'
import InstructorDashboard from '../features/instructors/ui/components/InstructorDashboard.jsx'

const AppRoutes = () => {

    let dispatch = useDispatch();

useEffect(() => {
    dispatch(getMe());
},[dispatch])
  

let router = createBrowserRouter([
    {
        element:<AuthRoute />,
        children: [
            {
                path:"/",
                element:<Login />
            },
            {
                path:"/register",
                element:<Register />
            }
        ]

    },
    {
        element:<ProtectedRoute allowedRoles={["admin"]} />,
        children:[
            {
                path:"/admin",
                element:<Admin />
            },
            {
                path:"/admin/courses",
                element:<Courses />
            },
            {
                path:"/admin/lectures",
                element:<Lectures />
            },
            {
            path: "/admin/lectures/create",
            element: <CreateLecture />
            },

            {
            path: "/admin/courses/create",
            element: <CreateCourse />
        },
        {
            path: "/admin/courses/edit/:courseId",
            element: <EditCourse />
        },
        {
            path: "/admin/instructors",
            element: <Instructors />       
        },
        

        ]
            
    },
    {
        element:<ProtectedRoute allowedRoles={["instructor"]} />,
        children:[
            {
                path:"/instructor",
                element:<InstructorDashboard  />
            },
            {
               path: "/instructor/lectures",
               element: <InstructorLectures />
            }
        ]
            
    }
])
  return <RouterProvider router={router} />
}
export default AppRoutes