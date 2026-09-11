import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser} from "../../state/authThunk"
import { getMe } from "../../state/authThunk";



const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        
         try {
        const result = await dispatch(loginUser(data)).unwrap();

        await dispatch(getMe()).unwrap();

        console.log("Login successful:", result);

        const user = result.data;

        if (user.role === "admin") {
            navigate("/admin");
        } else if (user.role === "instructor") {
            navigate("/instructor");
        }

    } catch (error) {
        console.error("Login failed:", error);
    }






            // // Redirect based on role
            // if (response.data.data.role === "admin") {
            //     navigate("/admin");
            // } else {
            //     navigate("/instructor");
            // }

        // } catch (error) {
        //     console.error(
        //         error.response?.data?.message || error.message
        //     );

        //     alert(
        //         error.response?.data?.message || "Login failed"
        //     );
        // }
    };

    return (
        <div className="min-h-screen bg-[#f3f6ff] flex items-center justify-center px-4">

            {/* Background Glow */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-white/70 blur-2xl"></div>

            {/* Login Card */}
            <div className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-sm px-8 py-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">

                    <h1 className="text-2xl font-semibold text-[#36516f]">
                        Sign In
                    </h1>

                    <button
                        type="button"
                        className="text-3xl font-light text-blue-500 hover:text-blue-600"
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    {/* Email */}
                    <div>

                        <div className="flex items-center border border-blue-100 rounded-lg px-4 h-11 focus-within:ring-2 focus-within:ring-blue-100">

                            <span className="text-blue-500 text-lg mr-3">
                                @
                            </span>

                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Enter a valid email",
                                    },
                                })}
                                className="w-full outline-none text-gray-600 placeholder:text-gray-500"
                            />

                        </div>

                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}

                    </div>

                    {/* Password */}
                    <div>

                        <div className="flex items-center border border-blue-100 rounded-lg px-4 h-11 focus-within:ring-2 focus-within:ring-blue-100">

                            <span className="text-blue-500 text-lg mr-3">
                                🔒
                            </span>

                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                })}
                                className="w-full outline-none text-gray-600 placeholder:text-gray-500"
                            />

                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}

                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition disabled:opacity-60"
                    >
                        {isSubmitting ? "SIGNING IN..." : "SIGN IN"}
                    </button>

                </form>

                {/* Sign Up */}
                <div className="text-center mt-8 text-sm text-[#536b85]">

                    Don't have an account yet?

                    <button
                        onClick={() => navigate("/register")}
                        className="ml-1 text-blue-500 font-medium underline"
                    >
                        Sign up
                    </button>

                </div>

                {/* Bottom Dots */}
                <div className="flex justify-center gap-1 mt-7">

                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>

                </div>

            </div>

        </div>
    );
};

export default Login;