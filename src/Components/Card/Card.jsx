/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AiFillDollarCircle } from "react-icons/ai";
import { FaAngleRight, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { increment } from "../../Redux/Features/AddToCart/addCartSlice";

const Card = ({ data }) => {
    const { title, image, price, quantity, _id } = data
    const dispatch = useDispatch()
    const handelAddToCart = (data) => {
        const { title, image, price, quantity, _id } = data
        const incrementData = { title, price, _id }
        dispatch(increment(incrementData))
    }
    return (
        <div className=" h-full">

            <div className="ml-10 my-20  h-[420px] max-w-[400px] rounded-lg relative overflow-hidden bg-gradient-to-r from-[#1a2531] to-[#10192B] ">
                <img
                    className=" w-full pb-7"
                    src="https://www.finder.com/niche-builder/6495af0aafcca.png"
                    alt=""
                />
                <div className="px-7">
                    <p className="text-gray-200 font-semibold text-2xl">{title}</p>
                    <p className="text-[#36fc46] font-semibold my-2 flex items-center text-lg">
                        <AiFillDollarCircle className="text-xl mr-1" /> € {price} USD
                    </p>
                    <p className="text-gray-400">In Stock: {quantity}</p>
                </div>
                <div className="text-gray-400 bg-[#232d3e] font-semibold grid grid-cols-2 absolute left-0 right-0 bottom-0">
                    {/* <Tooltip
                stock={card.stock}
                message={
                  card.stock === 0
                    ? "No more items left in stock, check later"
                    : `There's currently ${card.stock} items left in stock`
                }
              >
                <button
                  className={`ms-4 flex items-center ${card.stock != 0
                    ? "hover:text-[#6366F1]"
                    : "hover:text-red-700"
                    }`}
                >
                  <IoCube className="text-base mr-1" />
                  {card.stock}
                </button>
              </Tooltip> */}
                    <button className=" flex items-center justify-center hover:text-white  hover:bg-gradient-to-r from-[#62c750] to-[#02a92f] border-r border-gray-600">
                        <FaShoppingCart className="text-center mr-1 text-xl" />

                    </button>

                    <button onClick={() => handelAddToCart(data)} className="flex items-center justify-between ps-3 pe-4 py-1 hover:bg-gradient-to-r from-[#62c750] to-[#02a92f] hover:text-white">
                        <span>
                            {/* {card.stock === 0 ? "Out of stock" : "Purchase"} */} Buy Now
                        </span>
                        <FaAngleRight className="text-xl ml-1" />
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Card;