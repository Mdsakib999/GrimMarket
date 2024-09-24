import Login from "../Login";
import Navbar from "../Navbar/Navbar";
import Register from "../Register";
import Sidebar from "../Side bar/Sidebar";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <h1 className="">hi</h1>
            <Login></Login>

            <Register></Register>
        </div>
    );
};

export default Home;