import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  quantityDecrement,
  quantityIncrement,
} from "../../Redux/Features/AddToCart/addCartSlice";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Checkout = () => {
  const cartArray = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const location = useLocation();

  // Initialize the buyNowData state using useState
  const [buyNowData, setBuyNowData] = useState(
    location?.state?.incrementData ? [location?.state?.incrementData] : []
  );
  // Calculate total amount
  const totalAmount =
    cartArray.length > 0
      ? cartArray.reduce((acc, item) => acc + item.totalPrice, 0)
      : buyNowData[0]?.totalPrice || 0;

  // Handle checkout
  const handleCheckout = () => {
    console.log(
      "Proceeding to checkout with the following cart data:",
      cartArray
    );
    console.log("Total Amount:", totalAmount);
    alert(`Proceeding to payment. Total Amount: € ${totalAmount}`);
  };

  const itemsToDisplay = cartArray.length > 0 ? cartArray : buyNowData;

  // Function to handle buyNowData increment

  return (
    <div className="flex flex-col h-full">


      {/* Cart Items Table */}
      <div className="overflow-x-auto flex-grow mt-4">
        <table className="table-auto w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-800 text-white text-center">
              <th className="px-4 py-2 lg:text-xl">Product</th>
              <th className="px-4 py-2 lg:text-xl">Price</th>
              <th className="px-4 py-2 lg:text-xl">Quantity</th>
              <th className="px-4 py-2 lg:text-xl">Total Price</th>
              <th className="px-4 py-2 lg:text-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {itemsToDisplay.map((item) => (
              <tr
                key={item?._id}
                className="border-b border-gray-200 text-center"
              >
                <td className="sm:px-4 py-3 ">{item?.title}</td>
                <td className="sm:px-4 py-3">€ {item?.price}</td>
                <td className="sm:px-4 py-3  flex justify-evenly items-center">
                  {" "}
                  <span>
                    {" "}
                    <button
                      onClick={() => {
                        if (cartArray.length > 0) {
                          dispatch(quantityIncrement(item._id));
                        } else {
                          setBuyNowData((prevData) => {
                            const updatedData = [...prevData]; // Spread prevData to avoid mutation

                            if (updatedData.length > 0) {
                              const updatedItem = {
                                ...updatedData[0], // Spread the object to avoid mutation
                                quantity: updatedData[0].quantity + 1,
                                totalPrice: updatedData[0].price * (updatedData[0].quantity + 1),
                              };

                              updatedData[0] = updatedItem; // Replace the first item with updated item
                            }

                            return updatedData;
                          });

                        }
                      }}
                      className="bg-green-600 hover:bg-green-500 text-white px-2 rounded font-bold text-xl me-1 sm:me-0"
                    >
                      +
                    </button>
                  </span>{" "}
                  {item?.quantity}{" "}
                  <span>
                    <button
                      onClick={() => {
                        if (cartArray.length > 0) {
                          dispatch(quantityDecrement(item._id));
                        } else {
                          setBuyNowData((prevData) => {
                            let updatedData = [...prevData]; // Spread prevData to avoid mutation

                            if (updatedData.length > 0) {
                              const updatedItem = {
                                ...updatedData[0], // Spread the object to avoid mutation
                                quantity: updatedData[0].quantity - 1,
                                totalPrice: updatedData[0].price * (updatedData[0].quantity - 1),
                              };

                              updatedData[0] = updatedItem; // Replace the first item with updated item
                            }
                            if (updatedData[0].quantity == 0) {
                              updatedData = [];
                            }

                            return updatedData;
                          });

                        }
                      }}
                      className="bg-green-600 hover:bg-green-500 text-white px-2 rounded font-bold text-xl ms-1 sm:ms-0"
                    >
                      -
                    </button>
                  </span>
                </td>
                <td className="sm:px-4 py-3">€ {item?.totalPrice}</td>

                <td className="sm:px-4 px-1 py-3 space-x-3 ">
                  <button
                    onClick={() => {
                      if (cartArray.length > 0) {
                        dispatch(decrement(item._id));
                      } else {
                        setBuyNowData([]);
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount and Checkout Button */}
      <div className="mt-8 flex flex-col gap-4 items-center justify-center me-7">
        <h3 className="text-2xl font-semibold mb-2 text-gray-200">Total Amount : {totalAmount} €</h3>
        <button
          onClick={handleCheckout}
          disabled={itemsToDisplay.length < 1}
          className={`bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform transition-transform duration-200 ease-in-out active:scale-95 ${itemsToDisplay.length < 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:shadow-xl"
            }`}
        >
          Pay Now € {totalAmount.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
