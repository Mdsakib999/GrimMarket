import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";
import Sidebar from "../Pages/Side bar/Sidebar";
import { Toaster } from 'react-hot-toast';
import { useState } from "react";

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="thin-scrollbar">
            <Navbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} ></Navbar>
            <div className="relative">
                <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
                <span onClick={(pre) => setSidebarOpen(!pre)} className={`fixed top-24 text-xl z-50 border-2 rounded-full px-3  left-64 ${sidebarOpen ? "block md:hidden" : 'hidden '} `}>{`X`}</span>
            </div>
            <div className="md:ml-[260px] mt-16 px-3">
                <Outlet />
            </div>
            <Toaster />
        </div>
    );
};

export default MainLayout;