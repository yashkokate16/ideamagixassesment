import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    getLecturesByCourse,
    deleteLecture
} from "../../state/lectureThunk";

import { getAllCourses } from "../../../courses/state/courseThunk";


const Lectures = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { courses } = useSelector((state) => state.course);

    const {
        lectures,
        isLoading,
        error
    } = useSelector((state) => state.lecture);


    useEffect(() => {

        if (courses.length === 0) {
            dispatch(getAllCourses());
        }

    }, [dispatch, courses.length]);


    const handleCourseChange = (courseId) => {

        if (courseId) {
            dispatch(getLecturesByCourse(courseId));
        }

    };


    const handleDelete = async (lectureId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this lecture?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await dispatch(
                deleteLecture(lectureId)
            ).unwrap();

        } catch (error) {

            console.error("Delete lecture failed:", error);

        }

    };


    return (
        <div className="p-6">

            {/* Header */}

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h1 className="text-2xl font-semibold text-gray-800">
                        Lectures
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage course lectures
                    </p>

                </div>


                <button
                    onClick={() => navigate("/admin/lectures/create")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg"
                >
                    + Add Lecture
                </button>

            </div>


            {/* Course Filter */}

            <div className="bg-white rounded-xl p-5 shadow-sm mb-6">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Course
                </label>

                <select
                    onChange={(e) => handleCourseChange(e.target.value)}
                    className="w-full md:w-80 h-11 border border-gray-200 rounded-lg px-4 outline-none"
                >

                    <option value="">
                        Select course
                    </option>

                    {courses.map((course) => (

                        <option
                            key={course._id}
                            value={course._id}
                        >
                            {course.name}
                        </option>

                    ))}

                </select>

            </div>


            {/* Loading */}

            {isLoading && (
                <div className="text-center py-10 text-gray-500">
                    Loading lectures...
                </div>
            )}


            {/* Error */}

            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-5">
                    {error}
                </div>
            )}


            {/* No lectures */}

            {!isLoading && lectures.length === 0 && (

                <div className="bg-white rounded-xl p-10 text-center shadow-sm">

                    <p className="text-gray-500">
                        Select a course to view lectures.
                    </p>

                </div>

            )}


            {/* Lectures */}

            {!isLoading && lectures.length > 0 && (

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                                    Course
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                                    Instructor
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                                    Date
                                </th>

                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {lectures.map((lecture) => (


                                console.log("Lecture:", lecture),

                                <tr
                                    key={lecture._id}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4 text-gray-800">
                                        {lecture.course?.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {lecture.instructor?.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(
                                            lecture?.date
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4">

                                        <button
                                            onClick={() =>
                                                handleDelete(lecture._id)
                                            }
                                            className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm hover:bg-red-100"
                                        >
                                            Delete
                                        </button>

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


export default Lectures;