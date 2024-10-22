import { useState } from "react";
import { useDeleteProductMutation, useEditProductMutation, useGetAllProductsQuery } from "../../Redux/Features/Products/productApi";
import { categoriesArray, subcategories } from "../../utils/categoryItem";
import { FaSpinner } from "react-icons/fa";
import { cloudinaryUpload } from "../../utils/getImageLink";
import toast from "react-hot-toast";
import Loading from './../../Components/Loading/Loading';
import { RxCross2 } from "react-icons/rx";


const ManageProduct = () => {
    const [editData] = useEditProductMutation()
    const [deleteProduct] = useDeleteProductMutation()
    const [query, setQuery] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({})
    const [imageLink, setImageLink] = useState('')
    const [isImageChange, setIsImageChange] = useState(false)
    const [loading, setLoading] = useState(false)
    const { data, isLoading, error, refetch } = useGetAllProductsQuery(query);
    const [id, setId] = useState('')

    const handelEdit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const toastId = toast.loading('loading...')
        const form = e.target
        const title = form.title.value
        const price = form.price.value
        const quantity = form.quantity.value
        let image = ''
        const updateData = { title, price: Number(price), quantity: Number(quantity), image }
        if (isImageChange) {
            const imagePath = form.image.files[0]
            const imgCLink = await cloudinaryUpload(imagePath)
            updateData.image = imgCLink.secure_url
            updateData.oldImgUrl = imageLink
        }
        else {
            updateData.image = imageLink
        }
        const res = await editData({ updateData, id })
        if (res.data) {
            refetch()
            setShowModal(false)
            setImageLink('')
            setIsImageChange(false)
            setId('')
            setLoading(false)
            toast.success('Product update', { id: toastId })
        }
        else {
            setLoading(false)
            toast.success('Some Error', { id: toastId })
        }
    }
    const handelDelete = async (id) => {
        var proceed = confirm("Are you sure you want to proceed?");
        if (proceed) {
            const res = await deleteProduct(id)
            if (res) {
                toast.success('Successfully  Delete')
                refetch()
            }
        }

    }
    const closeModal = () => {
        setShowModal(false)
        setImageLink('')
        setIsImageChange(false)
        setId('')
    }


    if (isLoading) return <Loading />;
    if (error) return <div>Error loading products</div>;

    return (
        <div className="container mx-auto overflow-x-auto px-4 ">
            <h1 className="text-2xl font-bold my-4 text-white">Manage Products</h1>

            {/* Filter Form */}

           <div className="">
           <h2 className="text-xl font-semibold text-[#36fc46] mb-4 text-center">Filter Products</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-white mb-1">Category</label>
                    <select
                        name="sortBy"
                        value={query.sortBy}
                        // onChange={handleChange}
                        onChange={(e) => setQuery([{ name: 'categoryName', value: e.target.value }])}
                        className="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select category</option>
                        {
                            categoriesArray.map((item, index) => <option className="text-black" key={index} value={item.title}>{item.title}</option>)
                        }

                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-white mb-1">Sub Category</label>
                    <select
                        name="sortBy"
                        value={query.sortBy}
                        // onChange={handleChange}
                        onChange={(e) => setQuery([{ name: 'subCategoryName', value: e.target.value }])}
                        className="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Sub category</option>
                        {
                            subcategories.map((item, index) => <option key={index} value={item.subCategory}>{item.subCategory}</option>)
                        }

                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-white mb-1">Min Price</label>
                    <input
                        type="number"
                        name="minPrice"
                        value={query.minPrice}
                        onChange={(e) => setQuery([{ name: 'minPrice', value: e.target.value }])}
                        className="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter minimum price"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-white mb-1">Max Price</label>
                    <input
                        type="number"
                        name="maxPrice"
                        value={query.maxPrice}
                        onChange={(e) => setQuery([{ name: 'maxPrice', value: e.target.value }])}
                        className="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter maximum price"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-white mb-1">Sort By</label>
                    <select
                        name="sortBy"
                        value={query.sortBy}
                        onChange={(e) => setQuery([{ name: 'sortOrder', value: e.target.value }])}
                        className="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Sort</option>
                        <option value="asc">Price (Low to High)</option>
                        <option value="desc">Price (High to Low)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-white mb-1">Search </label>
                    <input
                        type="text"
                        name="categoryName"
                        onChange={(e) => setQuery([{ name: 'searchTerm', value: e.target.value }])}
                        className="w-full px-3 py-2 border  rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Searching"
                    />
                </div>
            </div>
           </div>


            {/* Products Table */}
            <table className="min-w-full overflow-x-auto text-white border border-gray-500 rounded-md bg-black mt-8 ">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border border-gray-500">Title</th>
                        <th className="py-2 px-4 border border-gray-500">Category</th>
                        <th className="py-2 px-4 border border-gray-500">Subcategory</th>
                        <th className="py-2 px-4 border border-gray-500">Price</th>
                        <th className="py-2 px-4 border border-gray-500">Quantity</th>
                        <th className="py-2 px-4 border border-gray-500">Action</th>
                    </tr>
                </thead>
                <tbody className="text-white text-center">
                    {data?.data?.map((product) => (
                        <tr key={product._id}>
                            <td className="py-2 px-4 border border-gray-500">{product.title}</td>
                            <td className="py-2 px-4 border border-gray-500">{product.categoryName}</td>
                            <td className="py-2 px-4 border border-gray-500">{product.subCategoryName}</td>
                            <td className="py-2 px-4 border border-gray-500">{product.price} €</td>
                            <td className="py-2 px-4 border border-gray-500">{product.quantity}</td>
                            <td className="py-2 px-4 border border-gray-500 mx-auto">
                                <span
                                    onClick={() => {
                                        setShowModal(true)
                                        setModalData(product)
                                        setImageLink(product.image)
                                        setId(product._id)
                                    }}
                                    className="cursor-pointer text-green-500 hover:text-green-600 px-2 py-1 rounded-md transition-colors duration-300"
                                >
                                    Edit
                                </span>
                                <span

                                    onClick={() => handelDelete(product._id)}
                                    className="cursor-pointer text-red-500 hover:text-red-600 px-2 py-1 rounded-md transition-colors duration-300 ml-4"
                                >
                                    Delete
                                </span>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                showModal ? (
                    <>
                        <div
                            className="justify-center  text-black items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-[80%] md:w-[50%] my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Product Edit
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={closeModal}
                                        >
                                            <span className="bg-transparent text-black  h-6 w-6 text-3xl lg:text-4xl block hover:text-red-500 outline-none focus:outline-none">
                                            <RxCross2 />
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                        <form onSubmit={handelEdit} className="space-y-4">

                                            {/* Title */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    defaultValue={modalData.title}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
                                                    placeholder="Enter product name"

                                                />
                                            </div>

                                            {/* Image */}


                                            {/* Price */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    defaultValue={modalData.price}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
                                                    placeholder="Enter price"

                                                />
                                            </div>

                                            {/* Quantity */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    defaultValue={modalData.quantity}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
                                                    placeholder="Enter quantity"

                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                                                {
                                                    isImageChange ?
                                                        <div className="flex">
                                                            <input
                                                                type="file"
                                                                name="image"
                                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 outline-none"

                                                            />

                                                            <span onClick={() => setIsImageChange(false)} className="inline-block px-3 pt-3 cursor-pointer bg-red-400 rounded-md pt">Change</span>

                                                        </div>
                                                        :
                                                        <div className="relative">
                                                            <img src={imageLink} alt="" className="size-16 inline-block" />
                                                            <span onClick={() => setIsImageChange(true)} className="absolute -top-1 left-11 cursor-pointer text-xl font-bold  ">x</span>
                                                        </div>
                                                }
                                            </div>



                                            {/* Submit Button */}
                                            <div className="text-center">
                                                <button
                                                    disabled={loading}
                                                    type="submit"
                                                    className="w-[70%] lg:w-[50%] mx-auto py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition flex items-center justify-center"
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
                                    {/*footer*/}
                                    {/* <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Save Changes
                                    </button>
                                </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null
            }
        </div >
    );
};

export default ManageProduct;
