import { useDispatch, useSelector } from 'react-redux';
import { decrement, quantityDecrement, quantityIncrement } from '../../Redux/Features/AddToCart/addCartSlice';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
    const cartArray = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const location = useLocation();
    const buyNowData = location?.state?.incrementData ? [location?.state?.incrementData] : [];

    // Calculate total amount
    const totalAmount = cartArray.length > 0
        ? cartArray.reduce((acc, item) => acc + item.totalPrice, 0)
        : buyNowData[0]?.price || 0;

    // Handle checkout
    const handleCheckout = () => {
        console.log('Proceeding to checkout with the following cart data:', cartArray);
        console.log('Total Amount:', totalAmount);
        alert(`Proceeding to payment. Total Amount: $${totalAmount}`);
    };

    const itemsToDisplay = cartArray.length > 0 ? cartArray : buyNowData;
    return (
        <div className="flex flex-col h-full">
            {/* Total Amount and Checkout Button */}
            <div className="mt-4 flex gap-4 items-center justify-end me-7">
                <h3 className="text-xl font-bold mb-2">Total Amount: ${totalAmount}</h3>
                <button
                    onClick={handleCheckout}
                    disabled={itemsToDisplay.length < 1}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${itemsToDisplay.length < 1 && 'cursor-not-allowed'}`}
                >
                    Proceed to Checkout
                </button>
            </div>

            {/* Cart Items Table */}
            <div className="overflow-x-auto flex-grow mt-4">
                <table className="table-auto w-full text-left text-sm">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Total Price</th>
                            {cartArray.length > 0 && <th className="px-4 py-2">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {itemsToDisplay.map((item) => (
                            <tr key={item?._id} className="border-b border-gray-200">
                                <td className="px-4 py-2">{item?.title}</td>
                                <td className="px-4 py-2">${item?.price}</td>
                                <td className="px-4 py-2">{item?.quantity}</td>
                                <td className="px-4 py-2">${item?.totalPrice || item?.price}</td>
                                {cartArray.length > 0 && (
                                    <td className="px-4 py-2 space-x-3">
                                        <button
                                            onClick={() => dispatch(quantityIncrement(item._id))}
                                            className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded"
                                        >
                                            Increase
                                        </button>
                                        <button
                                            onClick={() => dispatch(quantityDecrement(item._id))}
                                            className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded"
                                        >
                                            Decrement
                                        </button>
                                        <button
                                            onClick={() => dispatch(decrement(item._id))}
                                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default Checkout;
