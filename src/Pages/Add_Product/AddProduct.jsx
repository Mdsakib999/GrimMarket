import { useState } from 'react';
import { categoriesArray, subcategories } from '../../utils/categoryItem';
import { cloudinaryUpload } from '../../utils/getImageLink';
import { useCreateProductMutation } from '../../Redux/Features/Products/productApi';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

const AddProduct = () => {
    const [createProduct] = useCreateProductMutation()
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        image: null,
        price: '',
        quantity: '',
        categoryName: '',
        subCategoryName: '',
    });
    const categoryOptions = categoriesArray.map(item => (
        {
            value: item.title,
            option: item.title
        }
    ))
    const subCategoryOptions = subcategories.filter(item => item.categoryName === category)
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading('loading...');

        try {
            // Upload image to Cloudinary
            const imgLink = await cloudinaryUpload(formData.image);

            if (imgLink) {
                // Update formData image with the Cloudinary URL
                setFormData((prevData) => ({
                    ...prevData,
                    image: imgLink.secure_url,
                }));

                // Make sure to pass updated formData for product creation
                const updatedFormData = {
                    ...formData,
                    image: imgLink.secure_url,
                };
                updatedFormData.quantity = Number(updatedFormData.quantity)
                updatedFormData.price = Number(updatedFormData.price)

                // Call the API to create the product
                const res = await createProduct(updatedFormData);
                if (res.data) {
                    toast.success('Product uploaded successfully', { id: toastId });
                } else {
                    toast.error('Something went wrong while uploading the product', { id: toastId });
                }
            } else {
                toast.error('Failed to upload image to Cloudinary', { id: toastId });
            }
        } catch (error) {
            console.error('Error during product creation:', error);
            toast.error('An error occurred while uploading the product', { id: toastId });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 text-black">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Add New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter product title"
                            required
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter price"
                            required
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter quantity"
                            required
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="categoryName"
                            value={formData.categoryName}
                            onChange={(e) => {
                                handleChange(e);
                                setCategory(e.target.value);
                            }}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="">Select Category</option>
                            {
                                categoryOptions.map((item, index) => <option key={index} value={item.value}>{item.option}</option>)
                            }

                        </select>
                    </div>

                    {/* SubCategory Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                        <select
                            name="subCategoryName"
                            value={formData.subCategoryName}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="">Select Subcategory</option>
                            {
                                subCategoryOptions?.map((item, index) => <option key={index} value={item.subCategory}>{item.subCategory}</option>)
                            }
                            {/* {category === 'electronics' && (
                                <>
                                    <option value="smartphones">Smartphones</option>
                                    <option value="laptops">Laptops</option>
                                </>
                            )}
                            {category === 'fashion' && (
                                <>
                                    <option value="clothing">Clothing</option>
                                    <option value="accessories">Accessories</option>
                                </>
                            )}
                            {category === 'home' && (
                                <>
                                    <option value="kitchen">Kitchen</option>
                                    <option value="furniture">Furniture</option>
                                </>
                            )} */}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition flex items-center justify-center"
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin mr-2" /> // Spinner when loading
                            ) : (
                                'Add Product'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
