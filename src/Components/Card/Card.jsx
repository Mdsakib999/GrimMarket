/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AiFillDollarCircle } from "react-icons/ai";
import { FaAngleRight, FaShoppingCart } from "react-icons/fa";
import { AiOutlineEuro } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { increment, resetCart } from "../../Redux/Features/AddToCart/addCartSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ data }) => {
    const { title, image, price, quantity, _id } = data
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handelAddToCart = (data) => {
        const { title, image, price, quantity, _id } = data
        const incrementData = { title, price, _id }
        dispatch(increment(incrementData))
        toast.success('Add to Cart')
    }
    const handelByNow = (data) => {
        const { title, image, price, quantity, _id } = data
        const incrementData = { title, price, _id, quantity: 1, totalPrice: price }
        console.log(incrementData);
        dispatch(resetCart())
        if (incrementData) {
            navigate('/checkout', { state: { incrementData } })
        }
    }
    return (
        <div className="h-full">
            <Link
                to={`/details/${_id}`}
                className="border inline-block border-red-500 mt-20 mx-4 h-[210px] w-[200px] rounded-lg relative overflow-hidden bg-gradient-to-r from-[#1a2531] to-[#10192B]"
            >
                {/* Product Image */}
                <img className="w-full h-[90px]" src={image} alt={title} />

                {/* Product Information */}
                <div className="px-3">
                    <p className="text-gray-200 font-semibold mt-2">{title}</p>
                    <p className="text-[#36fc46] font-semibold mt-1 flex items-center">
                        {price},00 EUR
                    </p>
                    <p className="text-gray-400">Stock: {quantity}</p>
                </div>

                {/* Action Buttons */}
                <div className="text-gray-400 bg-[#232d3e] font-semibold grid grid-cols-2 absolute left-0 right-0 bottom-0 rounded-b-lg">
                    {/* Add to Cart Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault(); // Prevent navigation
                            handelAddToCart(data);
                        }}
                        className="flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-[#62c750] to-[#02a92f] border-r border-gray-600"
                    >
                        <FaShoppingCart className="text-center mr-1 text-xl" />
                    </button>

                    {/* Buy Now Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault(); // Prevent navigation
                            handelByNow(data);
                        }}
                        className="flex items-center justify-between ps-3 py-1 hover:bg-gradient-to-r from-[#62c750] to-[#02a92f] hover:text-white text-sm"
                    >
                        <span>Buy Now</span>
                        <FaAngleRight className="text-lg ml-1" />
                    </button>
                </div>
            </Link>
        </div>
    )
};

export default Card;