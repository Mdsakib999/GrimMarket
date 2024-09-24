import ProductsUpdates from "../../Components/News/ProductsUpdates";
import Login from "../Login";
import Navbar from "../Navbar/Navbar";
import Register from "../Register";
import Sidebar from "../Side bar/Sidebar";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Sidebar/>

            <ProductsUpdates></ProductsUpdates>
        </div>
    );
};

export default Home;