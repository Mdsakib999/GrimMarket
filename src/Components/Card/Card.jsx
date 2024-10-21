/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AiFillDollarCircle } from "react-icons/ai";
import { FaAngleRight, FaShoppingCart } from "react-icons/fa";
import { AiOutlineEuro } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { increment, resetCart } from "../../Redux/Features/AddToCart/addCartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
        dispatch(resetCart())
        navigate('/checkout', { state: { incrementData } })
    }
    return (
        <div className=" h-full ">

            <div className="border border-red-500 mt-20 mx-4  h-[210px] w-[200px] rounded-lg relative overflow-hidden bg-gradient-to-r from-[#1a2531] to-[#10192B] ">
                <img
                    className=" w-full h-[90px]"
                    src={image}
                    alt="card img"
                />
                <div className="px-3">
                    <p className="text-gray-200 font-semibold mt-2">{title}</p>
                    <p className="text-[#36fc46] font-semibold mt-1 flex items-center ">
                         {price},00 EUR
                    </p> 
                    {/* <AiOutlineEuro className="text-2xl mr-2" />  */}
                    <p className="text-gray-400">Stock: {quantity}</p>
                </div>
                <div className="text-gray-400 bg-[#232d3e] font-semibold grid grid-cols-2 absolute left-0 right-0 bottom-0 rounded-b-lg ">

                    <button onClick={() => handelAddToCart(data)} className=" flex items-center justify-center hover:text-white  hover:bg-gradient-to-r from-[#62c750] to-[#02a92f] border-r border-gray-600 ">
                        <FaShoppingCart className="text-center mr-1 text-xl" />

                    </button>

                    <button onClick={() => handelByNow(data)} className="flex items-center justify-between ps-3 pe- py-1 hover:bg-gradient-to-r from-[#62c750] to-[#02a92f] hover:text-white text-sm">
                        <span>
                            {/* {card.stock === 0 ? "Out of stock" : "Purchase"} */} Buy Now
                        </span>
                        <FaAngleRight className="text-lg ml-1" />
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Card;