import News from "../../Components/News/News";
import ProductsUpdates from "../../Components/News/ProductsUpdates";

const Home = () => {
  return (
    <div className="grid md:grid-cols-2 gap-x-3">
      <News></News>
      <ProductsUpdates></ProductsUpdates>
    </div>
  );
};

export default Home;
