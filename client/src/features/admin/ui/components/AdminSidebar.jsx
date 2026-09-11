import { NavLink } from "react-router-dom";

const AdminSidebar = () => {

    return (
        <aside className="w-60 min-h-[calc(100vh-64px)] bg-white border-r p-4">

            <div className="space-y-2">

                <NavLink
                    to="/admin"
                    className="block px-4 py-3 rounded-lg hover:bg-blue-50"
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/courses"
                    className="block px-4 py-3 rounded-lg hover:bg-blue-50"
                >
                    Courses
                </NavLink>

                <NavLink
                    to="/admin/lectures"
                    className="block px-4 py-3 rounded-lg hover:bg-blue-50"
                >
                    Lectures
                </NavLink>

                <NavLink
                    to="/admin/instructors"
                    className="block px-4 py-3 rounded-lg hover:bg-blue-50"
                >
    Instructors
</NavLink>

            </div>

        </aside>
    );
};

export default AdminSidebar;