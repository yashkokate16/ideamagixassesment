import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMyLectures } from "../../../lectures/state/lectureThunk";

const InstructorLectures = () => {

    const dispatch = useDispatch();

    const {
        lectures,
        isLoading,
        error
    } = useSelector((state) => state.lecture);


    useEffect(() => {

        dispatch(getMyLectures());

    }, [dispatch]);


    if (isLoading) {
        return (
            <div className="p-6">
                <p className="text-gray-500">
                    Loading lectures...
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

            <div className="mb-6">

                <h1 className="text-2xl font-semibold text-gray-800">
                    My Lectures
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    View your assigned lectures
                </p>

            </div>


            {/* No lectures */}

            {lectures.length === 0 ? (

                <div className="bg-white rounded-xl p-10 text-center shadow-sm">

                    <p className="text-gray-500">
                        No lectures assigned to you yet.
                    </p>

                </div>

            ) : (

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                                    Course
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                                    Level
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                                    Date
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {lectures.map((lecture) => (

                                <tr
                                    key={lecture._id}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4 text-gray-800">
                                        {lecture.course?.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {lecture.course?.level}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(
                                            lecture.date
                                        ).toLocaleDateString()}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
};

export default InstructorLectures;