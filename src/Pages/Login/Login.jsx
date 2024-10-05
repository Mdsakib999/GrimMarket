/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaSpinner } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useUserLoginMutation } from "../../Redux/Features/Auth/authApi";
import { decodedUser } from "../../utils/decoded";
import { useDispatch } from "react-redux";
import { loginIn } from "../../Redux/Features/Auth/authSlice";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import CaptchaComponent from "../../Components/CaptchaComponent/CaptchaComponent";

const Login = () => {
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useUserLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);  // Captcha validation state
  console.log(isCaptchaValid);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: 'safi4515',
      password: '1234568'
    }
  });

  const onSubmit = async (data) => {
    // if (!isCaptchaValid) {
    //   toast.error("Please complete the captcha verification.");
    //   return;
    // }

    setIsLoading(true);
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login(data);
      if (res?.data) {
        const userData = decodedUser(res.data.token);
        dispatch(loginIn(userData));
        toast.success("Login successful!", { id: toastId });
        navigate('/');
      } else {
        toast.error(res.error?.data?.message || "Login failed.", { id: toastId });
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("An error occurred during login.", { id: toastId });
      setIsLoading(false);
    }
  };

  return (
    <div className="md:w-[35%] mx-auto bg-black rounded-xl shadow-lg pt-1 mt-24">
      <p className="text-4xl font-semibold my-12 text-center text-gray-300">Login</p>

      <form onSubmit={handleSubmit(onSubmit)} className="shadow-md rounded px-12 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="userName">
            User Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="User Name"
            {...register("userName", {
              required: "Username is required.",
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: "Username should only contain letters and numbers.",
              },
            })}
          />
          {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
        </div>

        <div className="mb-4 relative">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            type={show ? "password" : "text"}
            placeholder="Enter Your Password"
            {...register("password", {
              required: "Password is required.",
              minLength: { value: 6, message: "Password must be at least 6 characters." },
            })}
          />
          <div className="cursor-pointer absolute right-3 text-black top-10" onClick={() => setShow(!show)}>
            {show ? <FaEye /> : <FaEyeSlash />}
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <CaptchaComponent setIsCaptchaValid={setIsCaptchaValid} /> {/* Pass setIsCaptchaValid */}

        <div className="flex items-center justify-center mt-8">
          <button
            disabled={isLoading || !isCaptchaValid}
            className={`bg-gradient-to-r from-blue-500 to-green-400 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline w-full flex justify-center items-center ${isLoading || !isCaptchaValid ? "cursor-not-allowed opacity-50" : ""}`}
            type="submit"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              "Login"
            )}
          </button>
        </div>

        <p className="mt-4 text-white text-center">OR</p>

        <div className="flex items-center justify-center">
          <Link to="/register" className="bg-gray-800 text-white text-center font-bold py-2 rounded focus:outline-none focus:shadow-outline mt-5 w-full">
            Create a new account
          </Link>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
