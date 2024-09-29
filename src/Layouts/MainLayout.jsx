import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";
import Sidebar from "../Pages/Side bar/Sidebar";
import { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";


const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="thin-scrollbar">
            <Navbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

            <div className="relative">
                {/* Sidebar */}
                <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                {/* "X" Close Button */}
                <span
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={`fixed top-24 text-xl z-50  px-3 left-64 transition-all duration-300 ease-in-out transform 
                    ${sidebarOpen ? "opacity-100 translate-x-0 block md:hidden" : "opacity-0 translate-x-full hidden"}`}
                >
                    <MdOutlineCancelPresentation size={26} className="text-white" />

                </span>
            </div>

            <div className="md:ml-[245px] mt-[65px] px-3">
                <Outlet />
            </div>
            <Toaster />
        </div>
    );
};

export default MainLayout;
