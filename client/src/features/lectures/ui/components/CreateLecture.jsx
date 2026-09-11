import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllCourses } from "../../../courses/state/courseThunk";
import { getAllInstructors } from "../../../instructors/state/instructorThunk";
import { createLecture } from "../../state/lectureThunk";


const CreateLecture = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        courses,
        isLoading: courseLoading
    } = useSelector((state) => state.course);

    const {
        instructors,
        isLoading: instructorLoading
    } = useSelector((state) => state.instructor);

    const {
        isLoading,
        error
    } = useSelector((state) => state.lecture);


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    useEffect(() => {

        if (courses.length === 0) {
            dispatch(getAllCourses());
        }

        if (instructors.length === 0) {
            dispatch(getAllInstructors());
        }

    }, [dispatch, courses.length, instructors.length]);


    const onSubmit = async (data) => {

        try {

            await dispatch(
                createLecture(data)
            ).unwrap();

            navigate("/admin/lectures");

        } catch (error) {

            console.error("Create lecture failed:", error);

        }

    };


    return (
        <div className="min-h-screen bg-[#f3f6ff] p-6">

            <div className="max-w-2xl mx-auto">

                <button
                    type="button"
                    onClick={() => navigate("/admin/lectures")}
                    className="text-blue-500 hover:underline text-sm mb-4"
                >
                    ← Back to Lectures
                </button>


                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    Create Lecture
                </h1>


                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white rounded-xl shadow-sm p-6 space-y-5"
                >

                    {/* Course */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course
                        </label>

                        <select
                            {...register("course", {
                                required: "Course is required"
                            })}
                            className="w-full h-11 border border-gray-200 rounded-lg px-4 outline-none"
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

                        {errors.course && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.course.message}
                            </p>
                        )}

                    </div>


                    {/* Instructor */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Instructor
                        </label>

                        <select
                            {...register("instructor", {
                                required: "Instructor is required"
                            })}
                            className="w-full h-11 border border-gray-200 rounded-lg px-4 outline-none"
                        >

                            <option value="">
                                Select instructor
                            </option>

                            {instructors.map((instructor) => (

                                <option
                                    key={instructor._id}
                                    value={instructor._id}
                                >
                                    {instructor.name} - {instructor.email}
                                </option>

                            ))}

                        </select>

                        {errors.instructor && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.instructor.message}
                            </p>
                        )}

                    </div>


                    {/* Date */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lecture Date
                        </label>

                        <input
                            type="date"
                            {...register("date", {
                                required: "Lecture date is required"
                            })}
                            className="w-full h-11 border border-gray-200 rounded-lg px-4 outline-none"
                        />

                        {errors.date && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.date.message}
                            </p>
                        )}

                    </div>


                    {/* Backend Error */}

                    {error && (
                        <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}


                    {/* Submit */}

                    <button
                        type="submit"
                        disabled={
                            isLoading ||
                            courseLoading ||
                            instructorLoading
                        }
                        className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium disabled:opacity-60"
                    >
                        {isLoading
                            ? "CREATING..."
                            : "CREATE LECTURE"}
                    </button>

                </form>

            </div>

        </div>
    );
};


export default CreateLecture;