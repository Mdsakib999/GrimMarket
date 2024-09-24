import ProductsUpdates from "../../Components/News/ProductsUpdates";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Side bar/Sidebar";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Sidebar />

            <ProductsUpdates></ProductsUpdates>
        </div>
    );
};

export default Home;