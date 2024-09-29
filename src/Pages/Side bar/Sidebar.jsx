import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsArrowRightSquare, BsArrowDownSquare } from "react-icons/bs";
import { FiMenu } from "react-icons/fi"; // For mobile hamburger menu icon
import { IoClose } from "react-icons/io5"; // For close icon in mobile
import { navData } from "../../utils/navData";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [activeLink, setActiveLink] = useState(null);
  const [openParent, setOpenParent] = useState(null);

  const toggleParent = (parent) => {
    setOpenParent((prevParent) => (prevParent === parent ? null : parent));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setActiveLink("news")
  };

  return (
    <>
      {/* Hamburger button for mobile */}
      {/* <div className="md:hidden p-4 bg-gray-900 text-white fixed top-0 left-0 -z-10 w-full flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <button onClick={toggleSidebar}>
          {sidebarOpen ? <IoClose size={30} /> : <FiMenu size={30} />}
        </button>
      </div> */}

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 h-full overflow-y-auto fixed top-0 left-0 transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-40`}
      >
        <ul   >
          <div className=" text-xl font-semibold text-center py-4 mb-8 bg-gradient-to-b from-[#060606]  via-[#04670c9f] to-[#040c05cc]">
            Grim Market
          </div>

          <li className="py-2 px-4">
            <NavLink
              to="/"

              className={({ isActive }) =>
                isActive
                  ? "flex py-3 ps-2 items-center justify-between bg-orange-400 bg-opacity-20 border-l-4 border-orange-500 text-orange-500"
                  : "flex py-3 ps-2  items-center justify-between hover:bg-orange-400 hover:bg-opacity-20 hover:border-l-4 border-orange-500"
              }
              onClick={() => toggleSidebar()}
            >
              News
            </NavLink>
          </li>

          <p className="text-gray-300 font-semibold text-lg mt-4 ps-3">Categories</p>

          <div>
            {navData.map((item, index) => (
              <div key={index}>
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
                        isActive ? "text-orange-500" : "text-white"
                      }
                      onClick={() => {
                        setActiveLink(item.link)
                        toggleSidebar()
                      }}
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
            <p className="text-gray-300 font-semibold text-lg ps-3 py-4">Help</p>
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

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
