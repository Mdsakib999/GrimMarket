import React, { useState, useEffect, useRef } from "react";
import { BsCart, BsPerson } from "react-icons/bs"; // Import icons for Cart and Profile
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to toggle profile dropdown
  const profileRef = useRef(null);

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  return (
    <nav className="bg-gray-950 text-white py-4 fixed top-0 w-full z-10 px-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: Grim Market */}
        <div className="text-xl font-semibold bg-gradient-to-b from-[#060606]  via-[#038e0eca] to-[#163019cc] bg-opacity-10">
  Grim Market
</div>

        {/* Right Side: Add funds, Orders, Money, Cart, Profile */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/addFunds" className="hover:text-green-400">Add funds</Link>
          <button className="hover:text-[#36fc46]">Orders</button>
          <span className="hover:text-[#36fc46]">$0.00</span> {/* Money */}
          <button className="hover:text-[#36fc46] flex items-center">
            <BsCart className="mr-1 text-[25px]" /> {/* Cart Icon */}
          </button>
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
                className="absolute right-0 top-10 mt-2 w-48 bg-[#1c1c1c] border border-gray-600 text-white rounded-lg shadow-lg z-20 p-4 "
              >
                <div className="flex items-center space-x-2 mb-3">
                  <div className="bg-green-500 rounded-full  flex items-center justify-center p-1 ">
                    <span><BsPerson className=" text-3xl" /></span>
                  </div>
                  <div>
                    <p className="font-bold">MaxAdil</p>
                    <p className="text-sm text-green-400">user</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">No contacts</p>
                <hr className="my-2 border-gray-600" />
                <ul className="space-y-2">
                  <li className="hover:text-green-400 cursor-pointer">My settings</li>
                  <li className="hover:text-green-400 cursor-pointer">My referrals</li>
                  <li className="hover:text-green-400 cursor-pointer">My orders</li>
                  <li className="hover:text-green-400 cursor-pointer">Logout</li>
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
