import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getMyLectures } from "../../../lectures/state/lectureThunk";

const InstructorDashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const {
        lectures,
        isLoading,
        error
    } = useSelector((state) => state.lecture);


    useEffect(() => {

        dispatch(getMyLectures());

    }, [dispatch]);


    const upcomingLectures = lectures.filter(
        (lecture) => new Date(lecture.date) >= new Date()
    );


    if (isLoading) {
        return (
            <div className="p-6">
                <p className="text-gray-500">
                    Loading dashboard...
                </p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }


    return (
        <div className="p-6">

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-2xl font-semibold text-gray-800">
                    Welcome, {user?.name} 👋
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Manage your assigned lectures
                </p>

            </div>


            {/* Stats */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-white rounded-xl shadow-sm p-6">

                    <p className="text-sm text-gray-500">
                        My Lectures
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800 mt-2">
                        {lectures.length}
                    </h2>

                </div>


                <div className="bg-white rounded-xl shadow-sm p-6">

                    <p className="text-sm text-gray-500">
                        Upcoming Lectures
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800 mt-2">
                        {upcomingLectures.length}
                    </h2>

                </div>

            </div>


            {/* My Lectures */}

            <div className="bg-white rounded-xl shadow-sm p-6">

                <div className="flex items-center justify-between mb-5">

                    <div>

                        <h2 className="text-lg font-semibold text-gray-800">
                            My Lectures
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Your assigned course lectures
                        </p>

                    </div>


                    <button
                        onClick={() => navigate("/instructor/lectures")}
                        className="text-blue-500 text-sm font-medium hover:underline"
                    >
                        View All
                    </button>

                </div>


                {lectures.length === 0 ? (

                    <p className="text-gray-500 text-sm">
                        No lectures assigned to you yet.
                    </p>

                ) : (

                    <div className="space-y-3">

                        {lectures.slice(0, 5).map((lecture) => (

                            <div
                                key={lecture._id}
                                className="flex items-center justify-between border border-gray-100 rounded-lg p-4"
                            >

                                <div>

                                    <h3 className="font-medium text-gray-800">
                                        {lecture.course?.name}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {lecture.course?.level}
                                    </p>

                                </div>


                                <div className="text-sm text-gray-500">
                                    {new Date(
                                        lecture.date
                                    ).toLocaleDateString()}
                                </div>

                            </div>

                        ))}

                    </div>

                )}


                <button
                    onClick={() => navigate("/instructor/lectures")}
                    className="mt-5 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg"
                >
                    View My Lectures
                </button>

            </div>

        </div>
    );
};

export default InstructorDashboard;