import News from "../../Components/News/News";
import ProductsUpdates from "../../Components/News/ProductsUpdates";

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
      <div>
        <News></News>
      </div>
      <div>
        <ProductsUpdates></ProductsUpdates>
      </div>
    </div>
  );
};

export default Home;
