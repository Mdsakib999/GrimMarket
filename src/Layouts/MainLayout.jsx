import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";
import Sidebar from "../Pages/Side bar/Sidebar";
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div className="thin-scrollbar">
            <Navbar></Navbar>
            <Sidebar />
            <div className="ml-[260px] mt-14 px-3">
                <Outlet />
            </div>
            <Toaster />
        </div>
    );
};

export default MainLayout;