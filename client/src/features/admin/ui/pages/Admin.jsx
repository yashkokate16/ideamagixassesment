import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

const Admin = () => {
    return (
        <div className="min-h-screen bg-gray-100">

            <AdminNavbar />

            <div className="flex">

                <AdminSidebar />

                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-semibold">
                        Admin Dashboard
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Welcome to the admin dashboard.
                    </p>
                </main>

            </div>

        </div>
    );
};

export default Admin;