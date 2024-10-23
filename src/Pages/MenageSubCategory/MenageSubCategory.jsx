import { useState } from "react";
import { useCreateSubCategoryMutation, useDeleteSubCategoryMutation, useGetAllCategoryQuery, useUpdateSubCategoryMutation } from "../../Redux/Features/Category/categoryApi";
import toast from "react-hot-toast";

const ManageCategory = () => {
    const { data: categoriesArray = [], refetch } = useGetAllCategoryQuery();
    const [updateSubCategory] = useUpdateSubCategoryMutation()
    const [createCategory] = useCreateSubCategoryMutation();
    const [deleteSubCategory] = useDeleteSubCategoryMutation();

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentSubCategory, setCurrentSubCategory] = useState("");
    const [newSubCategoryName, setNewSubCategoryName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const id = form.category.value;
        const subCategory = form.subCategory.value;
        console.log({ id, subCategory });
        const res = await createCategory({ payload: { subCategory }, id });
        if (res.data) {
            toast.success("Create Sub Category");
            form.reset();
            refetch();
        } else {
            toast.error(res?.error?.data?.message);
        }
    };

    const handleDeleteSubCategory = async (id, sub) => {
        var proceed = confirm("Are you sure you want to Delete Sub Category?");
        if (proceed) {
            const res = await deleteSubCategory({ payload: { subCategory: sub }, id });
            if (res.data) {
                toast.success("Delete Sub Category Successfully");
                refetch();
            } else {
                toast.error(res?.error?.data?.message);
            }
        }
    };

    // Show Edit Modal
    const handleEditSubCategory = (category, subCategory) => {
        setCurrentCategory(category);
        setCurrentSubCategory(subCategory);
        setNewSubCategoryName(subCategory); // Pre-fill the modal input
        setShowModal(true);
    };

    // Handle Subcategory Edit
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const id = currentCategory._id;
        const newCategory = newSubCategoryName;
        const payload = { newCategory, oldCategory: currentSubCategory }
        console.log(payload);
        const res = await updateSubCategory({ payload, id })
        if (res?.data) {
            setShowModal(false);
            setCurrentCategory(null);
            setCurrentSubCategory('');
            setNewSubCategoryName('');
            toast.success("Subcategory Updated!");
            refetch();
        }
        else {
            toast.error(res?.error?.data?.message);
        }


    };

    const categoryOptions = categoriesArray?.data?.map((item) => ({
        value: item?._id,
        option: item?.category,
    }));

    return (
        <div className="p-6">
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl text-black font-semibold mb-4 text-center">Add Sub Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            name="category"
                            required
                            className="w-full mt-1 px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select category</option>
                            {categoryOptions?.map((item, index) => (
                                <option className="text-black" key={index} value={item.value}>
                                    {item.option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                            Sub Category Name
                        </label>
                        <input
                            type="text"
                            id="subCategory"
                            name="subCategory"
                            className="mt-1 block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter subCategory name"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                        Submit
                    </button>
                </form>
            </div>

            {/* Categories Table */}
            <div className="mt-10">
                <h3 className="text-2xl text-black text-center font-semibold mb-4">Category List</h3>
                <table className="min-w-full bg-white text-black shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-3 px-6 text-left">Category</th>
                            <th className="py-3 px-6 text-left">Subcategories</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoriesArray?.data?.map((category) => (
                            <tr key={category.id} className="border-b">
                                <td className="py-3 px-6">{category.category}</td>
                                <td className="py-3 px-6">
                                    <ul className="border-collapse">
                                        {category.subCategory.map((sub, index) => (
                                            <li key={index} className="flex p-2 border justify-between items-center">
                                                {sub}
                                                <div>
                                                    <button
                                                        onClick={() => handleEditSubCategory(category, sub)}
                                                        className="ml-4 px-2 py-1 text-sm text-white bg-yellow-500 hover:bg-yellow-600 rounded"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSubCategory(category._id, sub)}
                                                        className="ml-2 px-2 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto ">
                    <div className="flex items-center justify-center min-h-screen ">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
                        <div className="bg-white p-6 rounded shadow-lg z-20 min-w-[200px]">
                            <h2 className="text-xl text-black mb-4">Edit Subcategory</h2>
                            <form onSubmit={handleEditSubmit}>
                                <label htmlFor="editSubCategory" className="block text-sm font-medium text-gray-700">
                                    Subcategory Name
                                </label>
                                <input
                                    type="text"
                                    id="editSubCategory"
                                    value={newSubCategoryName}
                                    onChange={(e) => setNewSubCategoryName(e.target.value)}
                                    className="mt-1 block  px-3 py-2 border w-full md:w-96 border-gray-300 rounded-md shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCategory;
