import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createCourse } from "../../state/courseThunk";

const CreateCourse = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error } = useSelector(
        (state) => state.course
    );

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const onSubmit = async (data) => {

        try {

            const result = await dispatch(
                createCourse(data)
            ).unwrap();

            console.log("Course created:", result);

            navigate("/admin/courses");

        } catch (error) {

            console.error("Create course failed:", error);

        }
    };


    return (
        <div className="min-h-screen bg-[#f3f6ff] p-6">

            <div className="max-w-2xl mx-auto">

                {/* Header */}

                <div className="mb-6">

                    <button
                        type="button"
                        onClick={() => navigate("/admin/courses")}
                        className="text-blue-500 hover:underline text-sm mb-3"
                    >
                        ← Back to Courses
                    </button>

                    <h1 className="text-2xl font-semibold text-gray-800">
                        Create Course
                    </h1>

                    <p className="text-gray-500 text-sm mt-1">
                        Add a new course
                    </p>

                </div>


                {/* Form */}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white rounded-xl shadow-sm p-6 space-y-5"
                >

                    {/* Course Name */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter course name"
                            {...register("name", {
                                required: "Course name is required"
                            })}
                            className="w-full h-11 border border-gray-200 rounded-lg px-4 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        />

                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}

                    </div>


                    {/* Level */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Level
                        </label>

                        <select
                            {...register("level", {
                                required: "Level is required"
                            })}
                            className="w-full h-11 border border-gray-200 rounded-lg px-4 outline-none focus:ring-2 focus:ring-blue-100"
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

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>

                        <textarea
                            rows="5"
                            placeholder="Enter course description"
                            {...register("description", {
                                required: "Description is required",
                                minLength: {
                                    value: 10,
                                    message: "Description must be at least 10 characters"
                                }
                            })}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        />

                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.description.message}
                            </p>
                        )}

                    </div>


                    {/* Image */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Image
                        </label>

                        <input
                            type="text"
                            placeholder="Enter image URL"
                            {...register("image", {
                                required: "Image is required"
                            })}
                            className="w-full h-11 border border-gray-200 rounded-lg px-4 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        />

                        {errors.image && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.image.message}
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
                        disabled={isLoading}
                        className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition disabled:opacity-60"
                    >
                        {isLoading
                            ? "CREATING..."
                            : "CREATE COURSE"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default CreateCourse;