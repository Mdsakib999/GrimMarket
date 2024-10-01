/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { BsCart, BsPerson } from "react-icons/bs"; // Import icons for Cart and Profile
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../Redux/Features/Auth/authSlice";
import {
  decrement,
  resetCart,
} from "../../Redux/Features/AddToCart/addCartSlice";
import { RxCross1 } from "react-icons/rx";


const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to toggle profile dropdown
  const [isAddToCartOpen, setIsAddToCartOpen] = useState(false);
  const profileRef = useRef(null);
  const cartRef = useRef(null);
  const { userName, role } = useSelector((state) => state.auth);
  const cartArray = useSelector((state) => state.cart);
  console.log(cartArray);
  const dispatch = useDispatch();
  // Toggle profile dropdown when the button is clicked
  const handleProfileClick = () => {
    setIsProfileOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsAddToCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef, cartRef]);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <nav className="bg-gray-900 text-white py-4 fixed top-0 w-full z-20 px-10 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: Grim Market */}
        {/* <div className="text-xl font-semibold bg-gradient-to-b from-[#060606]  via-[#038e0eca] to-[#163019cc] bg-opacity-10">
          Grim Market
        </div> */}
        <button onClick={toggleSidebar}>
          {sidebarOpen ? <IoClose size={30} /> : <FiMenu size={30} />}
        </button>

        {/* Right Side: Add funds, Orders, Money, Cart, Profile */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/addFunds" className="hover:text-green-400">
            Add funds
          </Link>
          <button className="hover:text-[#36fc46]">Orders</button>
          <span className="hover:text-[#36fc46]">$0.00</span> {/* Money */}
          <div className="relative">
            <button
              onClick={() => setIsAddToCartOpen(!isAddToCartOpen)}
              className="hover:text-[#36fc46] flex items-center"
            >
              <BsCart className="mr-1 text-[25px]" /> {/* Cart Icon */}
            </button>
            {isAddToCartOpen && (
              <div
                ref={cartRef}
                className="absolute right-0 top-10 mt-2 w-[400px] overflow-y-auto h-[500px] bg-[#1c1c1c] border border-gray-600 text-white rounded-lg shadow-lg z-50 p-4 "
              >
                <div>
                  <div className="flex justify-between">
                    <p className="font-semibold text-xl">My Carts</p>
                    <button
                      onClick={() => dispatch(resetCart())}
                      className="bg-red-600 bg-opacity-10 text-red-600 hover:bg-[#DC2626] hover:text-white border border-red-600  text-base px-3  py-1 rounded-md "
                    >
                      Clear All
                    </button>
                  </div>
                  <div>
                    {cartArray?.map((item, index) => (
                      <div className="flex justify-between  mt-4" key={index}>
                        <p>
                          {index + 1}. {item.title}{" "}
                        </p>
                        <p className=" flex items-center gap-x-4">
                          {item.quantity} / {item.totalPrice}{" "}
                          {/* <span
                            className=" px-2 text-xl font-semibold"
                            onClick={() => dispatch(decrement(item._id))}
                          >
                            
                          </span> */}
                          <RxCross1 onClick={() => dispatch(decrement(item._id))} className="text-red-600 hover:text-red-500 text-xl cursor-pointer"/>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="hover:text-[#36fc46] flex items-center border border-green-700 rounded-md px-2 py-1 bg-green-500 bg-opacity-20 hover:bg-opacity-25"
              onClick={handleProfileClick}
            >
              <BsPerson className="mr-1" /> {/* Profile Icon */}
              Profile
            </button>

            {/* Profile dropdown */}
            {isProfileOpen && (
              <div
                ref={profileRef}
                className="absolute right-0 top-10 mt-2 w-48 bg-[#1c1c1c] border border-gray-600 text-white rounded-lg shadow-lg z-50 p-4 "
              >
                <div className="flex items-center space-x-2 mb-3">
                  <div className="bg-green-500 rounded-full  flex items-center justify-center p-1 ">
                    <span>
                      <BsPerson className=" text-3xl" />
                    </span>
                  </div>
                  <div>
                    <p className="font-bold">{userName}</p>
                    <p className="text-sm text-green-400">
                      {role === "customer"
                        ? "user"
                        : role === "admin"
                        ? "admin"
                        : ""}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">No contacts</p>
                <hr className="my-2 border-gray-600" />
                <ul className="space-y-2">
                  <li className="hover:text-green-400 cursor-pointer">
                    <Link to={"/user/settings"}>My settings</Link>
                  </li>
                  <li className="hover:text-green-400 cursor-pointer">
                    My referrals
                  </li>
                  <li className="hover:text-green-400 cursor-pointer">
                    My orders
                  </li>
                  <li
                    onClick={() => dispatch(logOut())}
                    className="hover:text-green-400 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex space-x-4 items-center">
          <span className="hover:text-[#36fc46]">$0.00</span> {/* Money */}
          <button className="hover:text-[#36fc46]">
            <BsCart />
          </button>
          <button className="hover:text-[#36fc46]">
            <BsPerson />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
