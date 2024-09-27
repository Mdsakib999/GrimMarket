import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useUserRegisterMutation } from "../../Redux/Features/Auth/authApi";
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const [registerUser] = useUserRegisterMutation()

  // Initialize useForm hook from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Show a loading toast
    setIsLoading(true)
    const toastId = toast.loading("Registering...");

    try {
      // Call the registerUser API (replace this with your actual API call)

      const res = await registerUser(data);

      // If registration is successful
      if (res.data && res.data.success) {
        // Update the loading toast to success
        toast.success(res.data.message, {
          id: toastId, // Use the same toast ID
        });
      } else if (res.error && res.error.data && res.error.data.message) {
        // If there's an error response from the server
        toast.error(res.error.data.message, {
          id: toastId, // Use the same toast ID
        });
      } else {
        // If there's an unexpected response format or no success
        toast.error("Registration failed.", {
          id: toastId, // Use the same toast ID
        });
      }
      setIsLoading(false)
    } catch (error) {
      // Handle any unexpected errors like network issues, etc.
      toast.error(
        error.response?.data?.message || "An error occurred during registration.",
        {
          id: toastId, // Use the same toast ID
        }
      );

      console.error("Error:", error); // Log the error for debugging purposes
    }
    setIsLoading(false)
  };



  return (
    <div className="lg:w-[35%] mx-auto bg-black rounded-xl text-white mt-24 ">
      <h1 className="text-4xl font-semibold my-12 text-center pt-8 text-gray-300">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="shadow-md rounded px-8 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="username">
            Name
          </label>
          <input
            className="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="username"
            placeholder="Your Name"
            // Register input with validation
            {...register("userName", {
              required: "Name is required",
              minLength: {
                value: '6',
                message: "User name use Also 6 letter"
              },
              pattern: {
                value: /^[a-z0-9]+$/,
                message: "Username must contain only lowercase letters and numbers",
              },
            })}
          />
          {/* Display error message if name is invalid */}
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow text-black appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type={show ? "password" : "text"}
            name="password"
            placeholder="Enter Your Password"
            // Register input with validation
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          <div
            className="cursor-pointer absolute right-3 text-black top-10"
            onClick={() => setShow(!show)}
          >
            {show ? <FaEye /> : <FaEyeSlash />}
          </div>
          {/* Display error message if password is invalid */}
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline w-full mt-6"
            type="submit"
          >
            Sign Up
          </button>
        </div>

        <p className="mt-4 text-white text-center">OR</p>

        <div className="flex items-center justify-center">
          <Link
            to="/login"
            className="bg-gray-800 text-white text-center font-bold py-2 rounded focus:outline-none focus:shadow-outline mt-5 w-full"
          >
            Already Have Account ? <span className="text-orange-500">Login</span>
          </Link>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Register;
