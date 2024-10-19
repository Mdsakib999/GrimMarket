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
  const [isProfileOpen1, setIsProfileOpen1] = useState(false); // State to toggle profile dropdown
  const [isAddToCartOpen, setIsAddToCartOpen] = useState(false);
  const [isAddToCartOpen1, setIsAddToCartOpen1] = useState(false);
  const profileRef1 = useRef(null);
  const profileRef = useRef(null);
  const cartRef = useRef(null);
  const cartRef1 = useRef(null);
  const { userName, role } = useSelector((state) => state.auth);
  const cartArray = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // Toggle profile dropdown when the button is clicked
  const handleProfileClick = () => {
    setIsProfileOpen((prev) => !prev);
  };
  const handleProfileClick1 = () => {
    setIsProfileOpen1((prev) => !prev);
  };
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (profileRef1.current && !profileRef1.current.contains(event.target)) {
        setIsProfileOpen1(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsAddToCartOpen(false);
      }
      if (cartRef1.current && !cartRef1.current.contains(event.target)) {
        setIsAddToCartOpen1(false);
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
  const roleAbility = role === 'customer'
  const totalPrice = cartArray.reduce((acc, item) => acc + item.totalPrice, 0)
  return (
    <nav className="bg-gray-900 text-white py-3 md:py-4 fixed top-0 w-full z-20 md:px-10 px-5">
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
          {
            roleAbility && <button className="hover:text-[#36fc46]"><Link to={'/order'}>Orders</Link></button>
          }
          <span className="hover:text-[#36fc46]">$0.00</span> {/* Money */}
          {
            roleAbility && <div className="relative">
              <button
                onClick={() => setIsAddToCartOpen(!isAddToCartOpen)}
                className="hover:text-[#36fc46] flex items-center"
              >
                <BsCart className="mr-1 text-[25px]" /> {/* Cart Icon */}
                <span className="absolute -top-4 -right-2 bg-slate-700  text-[#36fc46] rounded-full py-1 px-[10px] text-center text-sm">{cartArray.length}</span>
              </button>

              {isAddToCartOpen && (
                <div
                  ref={cartRef}
                  className="absolute right-0 top-10 mt-2 w-[400px] overflow-hidden h-[500px] bg-[#1c1c1c] border border-gray-600 text-white rounded-lg shadow-lg z-50 p-4 flex flex-col"
                >
                  <div className="flex-grow overflow-y-auto">
                    <div className="flex justify-between">
                      <p className="font-semibold text-xl">My Carts</p>
                      <button
                        onClick={() => dispatch(resetCart())}
                        className="bg-red-600 bg-opacity-10 text-red-600 hover:bg-[#DC2626] hover:text-white border border-red-600 text-base px-3 py-1 rounded-md"
                      >
                        Clear All
                      </button>
                    </div>
                    <div>
                      {cartArray?.map((item, index) => (
                        <div className="flex justify-between mt-4" key={index}>
                          <p>
                            {index + 1}. {item.title}{" "}
                          </p>
                          <p className="flex items-center gap-x-4">
                            {item.quantity} / {item.totalPrice}{" "}
                            <RxCross1 onClick={() => dispatch(decrement(item._id))} className="text-red-600 hover:text-red-500 text-xl cursor-pointer" />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Checkout Button Fixed at Bottom */}
                  <div className="mt-4">
                    <hr />
                    <div className="mb-2 flex justify-between">
                      <p className="text-xl">Subtotal:</p>
                      <p>{totalPrice}</p>
                    </div>
                    <Link to="/checkout">
                      <button className="w-full bg-blue-600 text-white text-base px-4 py-2 rounded-md hover:bg-blue-700">
                        Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          }
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
                    <Link to={'/user/referrals'}>
                      My referrals
                    </Link>
                  </li>
                  <li className="hover:text-green-400 cursor-pointer">
                    <Link to={'/order'}>My orders</Link>
                  </li>
                  <li
                    onClick={() => dispatch(logOut())}
                    className="hover:text-green-400 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul >
              </div >
            )}
          </div >
        </div >

        {/* Mobile Menu */}
        <div className="md:hidden flex space-x-5 items-center " >
          <span className="hover:text-[#36fc46]">$0.00</span> {/* Money */}
          <button onClick={() => setIsAddToCartOpen1(!isAddToCartOpen1)} className="hover:text-[#36fc46] relative">
            <BsCart className="text-3xl" />
            <span className=" absolute -top-2 left- bg-slate-700  text-[#36fc46] rounded-full py-[3px] px-[7px] text-center  text-xs">{cartArray.length}</span>
          </button>
          <div>
            <div>
              <button onClick={handleProfileClick1} className="hover:text-[#36fc46]">
                <BsPerson className="text-4xl" />

              </button>
              {isAddToCartOpen1 && (
                <div
                  ref={cartRef1}
                  className="absolute right-3 top-10 mt-2 w-[250px] overflow-hidden h-[300px] bg-[#1c1c1c] border border-gray-600 text-white rounded-lg shadow-lg z-50 p-4 flex flex-col"
                >
                  <div className="flex-grow overflow-y-auto">
                    <div className="flex justify-between">
                      <p className="font-semibold text-xl">My Carts</p>
                      <button
                        onClick={() => dispatch(resetCart())}
                        className="bg-red-600 bg-opacity-10 text-red-600 hover:bg-[#DC2626] hover:text-white border border-red-600 text-base px-3 py-1 rounded-md"
                      >
                        Clear All
                      </button>
                    </div>
                    <div>
                      {cartArray?.map((item, index) => (
                        <div className="flex justify-between mt-4" key={index}>
                          <p>
                            {index + 1}. {item.title}{" "}
                          </p>
                          <p className="flex items-center gap-x-4">
                            {item.quantity} / {item.totalPrice}{" "}
                            <RxCross1 onClick={() => dispatch(decrement(item._id))} className="text-red-600 hover:text-red-500 text-xl cursor-pointer" />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Checkout Button Fixed at Bottom */}
                  <div className="mt-4">
                    <hr />
                    <div className="mb-2 flex justify-between">
                      <p className="text-xl">Subtotal:</p>
                      <p>{totalPrice}</p>
                    </div>
                    <Link to="/checkout">
                      <button className="w-full bg-blue-600 text-white text-base px-4 py-2 rounded-md hover:bg-blue-700">
                        Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {isProfileOpen1 && (
              <div
                ref={profileRef1}
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
                    <Link to={'/user/referrals'}>
                      My referrals
                    </Link>
                  </li>
                  <li className="hover:text-green-400 cursor-pointer">
                    <Link to={'/order'}>My orders</Link>
                  </li>
                  <li
                    onClick={() => dispatch(logOut())}
                    className="hover:text-green-400 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul >
              </div >
            )}
          </div>
        </div >
      </div >
    </nav >
  );
};

export default Navbar;
