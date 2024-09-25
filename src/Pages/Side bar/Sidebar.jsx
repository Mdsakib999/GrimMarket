import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsArrowRightSquare, BsArrowDownSquare } from "react-icons/bs";
import { navData } from "../../utils/navData";

const Sidebar = () => {
  // State to track the active parent link and child visibility
  const [activeLink, setActiveLink] = useState(null);
  const [openParent, setOpenParent] = useState(null);

  // Function to toggle parent links and show children
  const toggleParent = (parent) => {
    setOpenParent((prevParent) => (prevParent === parent ? null : parent));
  };

  return (
    <aside className="bg-gray-900 text-white w-64 h-full overflow-y-auto fixed top-14 left-0">
      <ul>
        <p className="text-gray-300 font-semibold text-lg ps-3">General</p>

        {/* News Item */}
        <li className="py-2 px-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex py-3 ps-2 items-center justify-between bg-orange-400 bg-opacity-20 border-l-4 border-orange-500 text-orange-500"
                : "flex py-3 ps-2  items-center justify-between hover:bg-orange-400 hover:bg-opacity-20 hover:border-l-4 border-orange-500"
            }
            onClick={() => setActiveLink("news")}
          >
            News
          </NavLink>
        </li>

        <p className="text-gray-300 font-semibold text-lg mt-4 ps-3">Categories</p>

        {/* Render Nav Data */}
        <div>
          {navData.map((item, index) => (
            <div key={index}>
              {/* Parent Link */}
              <li className="py-2 px-4">
                <div
                  onClick={() => toggleParent(item.link)}
                  className={`flex py-2 ps-2 pe-2 items-center justify-between cursor-pointer ${openParent === item.link
                    ? "bg-orange-400 bg-opacity-20 border-l-4 border-orange-500 text-orange-500"
                    : "hover:bg-orange-400 hover:bg-opacity-20 hover:border-l-4 border-orange-500"
                    }`}
                >
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-500"
                        : "text-white"
                    }
                    onClick={() => setActiveLink(item.link)}
                  >
                    {item.title}
                  </NavLink>

                  {item.children ? (
                    openParent === item.link ? (
                      <BsArrowDownSquare />
                    ) : (
                      <BsArrowRightSquare />
                    )
                  ) : null}
                </div>
              </li>

              {/* Children Links (visible if parent is clicked) */}
              {item.children && openParent === item.link && (
                <ul className="pl-8">
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex} className="py-2 px-4">
                      <NavLink
                        to={child.link}
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center justify-between bg-orange-400 bg-opacity-20 border-l-4 border-orange-500 text-orange-500"
                            : "flex  items-center justify-between hover:bg-orange-400 hover:bg-opacity-20 hover:border-l-4 border-orange-500"
                        }
                        onClick={() => setActiveLink(child.link)}
                      >
                        {child.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="mb-24">
          <p className="text-gray-300 font-semibold text-lg ps-3">Help</p>

          {/* News Item */}
          <li className="py-2 block px-4">
            <NavLink
              to="/support"
              className={({ isActive }) =>
                isActive
                  ? "flex py-3 ps-2 items-center justify-between bg-orange-400 bg-opacity-20 border-l-4 border-orange-500 text-orange-500"
                  : "flex py-3 ps-2  items-center justify-between hover:bg-orange-400 hover:bg-opacity-20 hover:border-l-4 border-orange-500"
              }
              onClick={() => setActiveLink("support")}
            >
              Support
            </NavLink>
          </li>
          <li className="py-2 block px-4">
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                isActive
                  ? "flex py-3 ps-2 items-center justify-between bg-orange-400 bg-opacity-20 border-l-4 border-orange-500 text-orange-500"
                  : "flex py-3 ps-2  items-center justify-between hover:bg-orange-400 hover:bg-opacity-20 hover:border-l-4 border-orange-500"
              }
              onClick={() => setActiveLink("faq")}
            >
              FAQ
            </NavLink>
          </li>
        </div>
      </ul>
    </aside>
  );
};

export default Sidebar;
