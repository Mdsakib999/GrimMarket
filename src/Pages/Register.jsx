import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Register = () => {

  const [error, setError] = useState("");
  const [show, setShow] = useState(true);





  return (
    <div className="lg:w-[40%] mx-auto bg-black rounded-xl text-white">
      <h1 className="text-4xl font-semibold my-12 text-center pt-8">
        Register
      </h1>
      <form
        className=" shadow-md rounded px-8 pb-8 mb-4"

      >
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="username"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="username"
            placeholder="Your Name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            placeholder="Your Email"
            id="email"

          />
          
        </div>

        <div className="mb-4 relative">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type={show ? "password" : "text"}
            name="password"
            placeholder="Enter Your Password"
            id="password"
            // {...register("password", {
            //   required: true,
            //   minLength: 6,
            //   pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])(?=.*[0-9])/,
            // })}
          />
          <div
            className="cursor-pointer absolute right-3 top-10"
            onClick={() => setShow(!show)}
          >
            {show? <FaEye/> : <FaEyeSlash/>}
          </div>
          
          {/* {errors.password?.type === "pattern" && (
            <span className="text-red-500 text-xs italic">
              Should have one upper case, one lower case, one special character
              and one number
            </span>
          )} */}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline w-full mt-6"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <p className="mt-4 text-white text-center">
          OR
        </p>

        <div className="flex items-center justify-center">
          <Link to="/login"
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

export default Register;
