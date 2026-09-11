const AdminNavbar = () => {
    return (
        <nav className="h-16 bg-white border-b flex items-center justify-between px-6">

            <h1 className="text-xl font-semibold text-blue-600">
                CodeRoom
            </h1>

            <div>
                <span className="text-gray-700">
                    Admin
                </span>
            </div>

        </nav>
    );
};

export default AdminNavbar;