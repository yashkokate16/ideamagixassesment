import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getAllCourses, updateCourse } from "../../state/courseThunk";

const EditCourse = () => {

    const { courseId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        courses,
        isLoading,
        error
    } = useSelector((state) => state.course);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();


    // Find course from Redux
    const course = courses.find(
        (course) => course._id === courseId
    );
    console.log(courseId);
    console.log(course);


    // If courses aren't loaded
    useEffect(() => {

        if (courses.length === 0) {
            dispatch(getAllCourses());
        }

    }, [dispatch, courses.length]);


    // Put existing data into form
    useEffect(() => {

        if (course) {

            reset({
                name: course.name,
                level: course.level,
                description: course.description,
                image: course.image
            });

        }

    }, [course, reset]);


    const onSubmit = async (data) => {

        try {

            await dispatch(
                updateCourse({
                    courseId,
                    courseData: data
                })
            ).unwrap();

            navigate("/admin/courses");

        } catch (error) {

            console.error(error);

        }
    };


    if (!course && isLoading) {
        return (
            <div className="p-6">
                Loading course...
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#f3f6ff] p-6">

            <div className="max-w-2xl mx-auto">

                <button
                    onClick={() => navigate("/admin/courses")}
                    className="text-blue-500 mb-4"
                >
                    ← Back to Courses
                </button>


                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    Edit Course
                </h1>


                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white rounded-xl p-6 shadow-sm space-y-5"
                >

                    {/* Name */}

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Course Name
                        </label>

                        <input
                            {...register("name", {
                                required: "Course name is required"
                            })}
                            className="w-full border rounded-lg px-4 h-11 outline-none"
                        />

                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}

                    </div>


                    {/* Level */}

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Level
                        </label>

                        <select
                            {...register("level", {
                                required: "Level is required"
                            })}
                            className="w-full border rounded-lg px-4 h-11"
                        >

                            <option value="">
                                Select level
                            </option>

                            <option value="beginner">
                                Beginner
                            </option>

                            <option value="intermediate">
                                Intermediate
                            </option>

                            <option value="advanced">
                                Advanced
                            </option>

                        </select>

                        {errors.level && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.level.message}
                            </p>
                        )}

                    </div>


                    {/* Description */}

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            rows="5"
                            {...register("description", {
                                required: "Description is required"
                            })}
                            className="w-full border rounded-lg px-4 py-3 resize-none"
                        />

                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.description.message}
                            </p>
                        )}

                    </div>


                    {/* Image */}

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Image URL
                        </label>

                        <input
                            {...register("image", {
                                required: "Image is required"
                            })}
                            className="w-full border rounded-lg px-4 h-11"
                        />

                        {errors.image && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.image.message}
                            </p>
                        )}

                    </div>


                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}


                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white h-11 rounded-lg"
                    >
                        {isLoading ? "UPDATING..." : "UPDATE COURSE"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default EditCourse;