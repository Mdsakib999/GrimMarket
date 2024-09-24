import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";


const Login = () => {

  const [error, setError] = useState("");
  const [show, setShow] = useState(true);



  return (
    <div className="lg:w-[40%] mx-auto bg-black rounded-xl shadow-lg pt-1">
      <p className="text-4xl font-semibold my-12 text-center text-white ">Login</p>
      <form
        className=" shadow-md rounded px-12 pt-6 pb-8 mb-4"

      >
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="text"
          >
            User Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="text"
            placeholder="User Name"
            id="text"

          />
        </div>

        <div className="mb-4 relative">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            type={show ? "password" : "text"}
            name="password"
            id="password"

          />
          <div className="cursor-pointer absolute right-3 top-10" onClick={() => setShow(!show)}>
            {show ? <FaEye /> : <FaEyeSlash />}
          </div>

          {/* {errors.password && (
            <span className="text-red-500 text-xs italic">
              Password is required
            </span>
          )} */}

        </div>
        <p className="text-red-600 text-center font-bold">{error}</p>
        <div className="flex items-center justify-center mt-8">
          <button
            className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Login
          </button>
        </div>
        <p className="mt-4 text-white text-center">
          OR
        </p>

        <div className="flex items-center justify-center">
          <Link to="/register"
            className="bg-gray-800 text-white text-center font-bold py-2  rounded focus:outline-none focus:shadow-outline mt-5 w-full"
            type="submit"
          >
            Create a new account
          </Link>
        </div>
      </form>

    </div>
  );
};

export default Login;
