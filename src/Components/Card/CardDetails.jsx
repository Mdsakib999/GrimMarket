import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../Redux/Features/Products/productApi";
import Loading from "../Loading/Loading";
import { FaAngleRight, FaShoppingCart } from "react-icons/fa";

const CardDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id, { skip: !id });
  const cardData = data?.data;
  const { title, image, price, categoryName, subCategoryName, quantity, _id } =
    !cardData
      ? {
          title: "",
          image: "",
          price: "",
          categoryName: "",
          subCategoryName: "",
          quantity: "",
          _id: "",
        }
      : cardData;
  if (isLoading) {
    return <Loading />;
  }
  console.log(cardData);
  return (
    <div className="pt-5  ps-8">
      <div className="md:flex items-center gap-x-4 ">
        <img
          className="w-[300px] h-[160px] rounded-lg border"
          src={image}
          alt="product image"
        />

        <div className="mt-4">
          <p className="text-lg text-gray-400">
            {categoryName}{" "}
            <span className=" ms-2 px-2 border-l">{subCategoryName}</span>
          </p>
          <p className="text-xl md:text-2xl font-bold mt-2">{title}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-x-4 ps-2">
        <p className="text-[#36fc46] font-semibold text-xl md:text-3xl">
          {price}
          <span className="text-lg">,00</span> €
        </p>
        <p className="border-l ps-4 text-base md:text-lg font-semibold text-gray-300">
          Available: <span className="text-[#36fc46]">{quantity}</span>
        </p>
        <p className="border-l ps-4 text-base md:text-lg font-semibold text-gray-300">
          Delivery: <span className="text-[#36fc46]">Instant</span>
        </p>
      </div>

      <div>
        <p className="mt-8 md:mt-12 text-xl font-semibold text-gray-300">Purchase</p>
        <p className="px-4 mt-3 text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
          dignissimos illo optio cum ad fugiat quis aspernatur ullam veritatis.
          Aliquam? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Qui, rerum maiores doloremque, quisquam, odit neque deserunt libero
          modi obcaecati exercitationem nulla labore incidunt natus a! Accusamus
          nostrum provident ea veritatis.
        </p>
      </div>

      <div className="mt-10 flex gap-x-5">
        <Link
          to={quantity === 0 ? "#" : ""}
          onClick={
            quantity === 0
              ? (e) => e.preventDefault()
              : () => handelAddToCart(data)
          }
          className={`w-[40%] lg:w-[20%] flex items-center justify-center px-2 md:text-xl font-semibold py-2 bg-gradient-to-r from-[#62c750] to-[#02a92f] border-r border-gray-600 rounded-md ${
            quantity === 0
              ? "cursor-not-allowed opacity-70"
              : "hover:text-white"
          }`}
        >
          <FaShoppingCart className="text-center mr-3 text-xl" /> Add to Cart
        </Link>

        <Link
          to={quantity === 0 ? "#" : ""}
          onClick={
            quantity === 0 ? (e) => e.preventDefault() : () => handelByNow(data)
          }
          className={`w-[40%] lg:w-[20%] flex items-center justify-between text-center py-2 bg-gradient-to-r from-[#62c750] to-[#02a92f] text-sm rounded-md ${
            quantity === 0
              ? "cursor-not-allowed opacity-70"
              : "hover:text-white"
          }`}
        >
          <span className="text-center w-full md:text-xl font-semibold">
            {quantity === 0 ? "Out of stock" : "Buy Now"}
          </span>
        </Link>
      </div>

      <div className="my-12">
        <p className=" text-xl font-semibold text-gray-300">Description</p>
        <p className="px-4 mt-3 text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
          dignissimos illo optio cum ad fugiat quis aspernatur ullam veritatis.
          Aliquam? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
        <p className="px-4 mt-3 text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
          dignissimos illo optio cum ad fugiat quis aspernatur ullam veritatis.
          Aliquam? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
        <p className="px-4 mt-3 text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
          dignissimos illo optio cum ad fugiat quis aspernatur ullam veritatis.
          Aliquam? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
        <p className="px-4 mt-3 text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
          dignissimos illo optio cum ad fugiat quis aspernatur ullam veritatis.
          Aliquam? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
        <p className="px-4 mt-3 text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
          dignissimos illo optio cum ad fugiat quis aspernatur ullam veritatis.
          Aliquam? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
        
      </div>
    </div>
  );
};

export default CardDetails;
