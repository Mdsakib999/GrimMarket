import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightSquare } from "react-icons/bs";
const Sidebar = () => {
  // State to track the active link
  const [activeLink, setActiveLink] = useState(null);

  // Function to handle click and set active state
  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <aside className="bg-gray-900 text-white w-64 h-full fixed top-14 left-0">
      <ul>
        <p className="text-gray-300 font-semibold text-lg ps-3">General</p>

        {/* News Item */}
        <li
          onClick={() => handleClick("news")}
          className={`py-2 px-4 flex items-center justify-between cursor-pointer ${
            activeLink === "news"
              ? "bg-orange-400 bg-opacity-20 border-l-4 border-orange-500 text-orange-500"
              : "hover:bg-orange-400 hover:bg-opacity-20 hover:border-l-4 border-orange-500 "
          }`}
        >
          <Link to="/news">News</Link>
          <BsArrowRightSquare />
        </li>

        <p className="text-gray-300 font-semibold text-lg mt-4 ps-3">Categories</p>

        {/* Credit Cards Item */}
        <li
          onClick={() => handleClick("credit-cards")}
          className={`py-2 px-4 flex items-center justify-between cursor-pointer ${
            activeLink === "credit-cards"
              ? "bg-orange-400 bg-opacity-20 border-l-4 border-orange-500 text-orange-500"
              : "hover:bg-orange-400 hover:bg-opacity-20 hover:border-l-4 border-orange-500 "
          }`}
        >
          <Link to="/">Credit Cards</Link>
          <BsArrowRightSquare />
        </li>

        {/* Online Bankings Item */}
        <li
          onClick={() => handleClick("online-bankings")}
          className={`py-2 px-4 flex items-center justify-between cursor-pointer ${
            activeLink === "online-bankings"
              ? "bg-orange-400 bg-opacity-20 border-l-4 border-orange-500 text-orange-500"
              : "hover:bg-orange-400 hover:bg-opacity-20 hover:border-l-4 border-orange-500 "
          }`}
        >
          <Link to="/online-bankings">Online Bankings</Link>
          <BsArrowRightSquare />
        </li>

        {/* Accounts Item */}
        <li
          onClick={() => handleClick("accounts")}
          className={`py-2 px-4 flex items-center justify-between cursor-pointer ${
            activeLink === "accounts"
              ? "bg-orange-400 bg-opacity-20 border-l-4 border-orange-500 text-orange-500"
              : "hover:bg-orange-400 hover:bg-opacity-20 hover:border-l-4 border-orange-500 "
          }`}
        >
          <Link to="/accounts">Accounts</Link>
          <BsArrowRightSquare />
        </li>

        {/* Add more sidebar links */}
      </ul>
    </aside>
  );
};

export default Sidebar;
