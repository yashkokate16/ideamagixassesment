import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser} from "../../state/authThunk"

const Register = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Register Data:", data);

    // Later:
    dispatch(registerUser(data));


    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f4f7ff] flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-white rounded-full blur-3xl opacity-70"></div>

      {/* Register Card */}
      <div className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-sm px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold text-[#34506b]">
            Sign Up
          </h1>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-2xl text-blue-500 hover:text-blue-600"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Name */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-200 rounded-lg px-4 h-11 focus-within:border-blue-400">
              
              <span className="text-blue-500 mr-3">
                👤
              </span>

              <input
                type="text"
                placeholder="Name"
                className="w-full outline-none text-gray-600 placeholder-gray-500"
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </div>

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-200 rounded-lg px-4 h-11 focus-within:border-blue-400">
              
              <span className="text-blue-500 mr-3">
                @
              </span>

              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none text-gray-600 placeholder-gray-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <div className="flex items-center border border-gray-200 rounded-lg px-4 h-11 focus-within:border-blue-400">
              
              <span className="text-blue-500 mr-3">
                🔒
              </span>

              <input
                type="password"
                placeholder="Password"
                className="w-full outline-none text-gray-600 placeholder-gray-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition"
          >
            SIGN UP
          </button>

        </form>

        {/* Login Link */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;