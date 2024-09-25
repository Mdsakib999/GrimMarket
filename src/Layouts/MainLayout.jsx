import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";
import Sidebar from "../Pages/Side bar/Sidebar";

const MainLayout = () => {
    return (
        <div className="thin-scrollbar">
            <Navbar></Navbar>
            <Sidebar />
            <div className="ml-[260px] mt-14 px-3">
                <Outlet />
            </div>

        </div>
    );
};

export default MainLayout;