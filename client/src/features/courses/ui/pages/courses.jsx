import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllCourses } from "../../state/courseThunk";
import { deleteCourse } from "../../state/courseThunk";


const Courses = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        courses,
        isLoading,
        error
    } = useSelector((state) => state.course);


    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);


    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-gray-500">
                    Loading courses...
                </p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-500">
                    {error}
                </p>
            </div>
        );
    }


    const handleDelete = async (courseId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        await dispatch(deleteCourse(courseId)).unwrap();

    } catch (error) {

        console.error("Delete failed:", error);

    }
};

    return (
        <div className="p-6">

            {/* Header */}

            <div className="flex items-center justify-between mb-6">

                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Courses
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage all courses
                    </p>
                </div>


                <button
                    onClick={() => navigate("/admin/courses/create")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg transition"
                >
                    + Add Course
                </button>

            </div>


            {/* Courses */}

            {courses.length === 0 ? (

                <div className="bg-white rounded-xl p-10 text-center shadow-sm">

                    <p className="text-gray-500">
                        No courses found.
                    </p>

                    <button
                        onClick={() => navigate("/admin/courses/create")}
                        className="mt-4 text-blue-500 hover:underline"
                    >
                        Create your first course
                    </button>

                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {courses.map((course) => (

                        <div
                            key={course._id}
                            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                        >

                            {/* Image */}

                            {course.image ? (

                                <img
                                    src={course.image}
                                    alt={course.name}
                                    className="w-full h-44 object-cover"
                                />

                            ) : (

                                <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-400">
                                        No Image
                                    </span>
                                </div>

                            )}


                            {/* Content */}

                            <div className="p-5">

                                <h2 className="text-lg font-semibold text-gray-800">
                                    {course.name}
                                </h2>

                                <p className="text-sm text-blue-500 mt-1">
                                    {course.level}
                                </p>

                                <p className="text-sm text-gray-500 mt-3 line-clamp-3">
                                    {course.description}
                                </p>


                                {/* Actions */}

                                <div className="flex gap-3 mt-5">

                                    <button
                                   onClick={() =>
                                   navigate(`/admin/courses/edit/${course._id}`)
                                    }
                                   className="flex-1 border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50"
                                  >
                                    Edit
                                   </button>

                                    <button
                                       onClick={() => handleDelete(course._id)}
                                     className="flex-1 bg-red-50 text-red-500 py-2 rounded-lg text-sm hover:bg-red-100"
                                      >
                                      Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default Courses;