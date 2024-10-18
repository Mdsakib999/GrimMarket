import { useDispatch, useSelector } from 'react-redux';
import { decrement, quantityDecrement, quantityIncrement } from '../../Redux/Features/AddToCart/addCartSlice'; // Assuming you have an 'increment' action

const Order = () => {
    const cartArray = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // Calculate total price for all items
    const totalAmount = cartArray.reduce((acc, item) => acc + item.totalPrice, 0);

    // Handle checkout
    const handleCheckout = () => {
        // This would typically involve integrating with a payment gateway (like Stripe, PayPal, etc.)
        // For now, we'll just log the cart data and total amount
        console.log('Proceeding to checkout with the following cart data:', cartArray);
        console.log('Total Amount:', totalAmount);

        // Here you would trigger the payment process, such as redirecting to a payment page or API call
        alert(`Proceeding to payment. Total Amount: $${totalAmount}`);
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full text-left text-sm">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Total Price</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cartArray?.map((item) => (
                        <tr key={item._id} className="border-b border-gray-200">
                            <td className="px-4 py-2">{item.title}</td>
                            <td className="px-4 py-2">${item.price}</td>
                            <td className="px-4 py-2">{item.quantity}</td>
                            <td className="px-4 py-2">${item.totalPrice}</td>
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
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Display Total Amount */}
            <div className="mt-4">
                <h3 className="text-xl font-bold">Total Amount: ${totalAmount}</h3>
            </div>

            {/* Checkout Button */}
            <div className="mt-4">
                <button
                    onClick={handleCheckout}
                    disabled={cartArray.length === 0}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${cartArray.length === 0 && 'cursor-not-allowed'}`}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Order;
