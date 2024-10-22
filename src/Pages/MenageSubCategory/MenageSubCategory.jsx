
import { useCreateSubCategoryMutation, useDeleteSubCategoryMutation, useGetAllCategoryQuery } from "../../Redux/Features/Category/categoryApi";
import toast from "react-hot-toast";

const ManageCategory = () => {
    const { data: categoriesArray = [], refetch } = useGetAllCategoryQuery()
    const [createCategory] = useCreateSubCategoryMutation()
    const [deleteSubCategory] = useDeleteSubCategoryMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        const id = form.category.value
        const subCategory = form.subCategory.value
        console.log({ id, subCategory });
        const res = await createCategory({ payload: { subCategory }, id })
        if (res.data) {
            toast.success("Create Sub Category");
            e.target.reset();
            refetch();
        } else {
            toast.error(res?.error?.data?.message);
        }

    };
    const handleDeleteSubCategory = async (id, sub) => {
        var proceed = confirm("Are you sure you want Delete Sub Category");
        if (proceed) {
            console.log(id, sub);
            const res = await deleteSubCategory({ payload: { subCategory: sub }, id })
            if (res.data) {
                toast.success("Delete Sub Category Succesfully");
                refetch();
            } else {
                toast.error(res?.error?.data?.message);
            }
        }
    }
    const categoryOptions = categoriesArray?.data?.map(item => (
        {
            value: item?._id,
            option: item?.category
        }
    ))

    return (
        <div className="p-6">
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md ">
                <h2 className="text-2xl text-black font-semibold mb-4 text-center">
                    Add Sub Category
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Category
                        </label>
                        <select
                            name="category"
                            // value={query.sortBy}
                            // onChange={handleChange}
                            // onChange={(e) => {
                            //     setQuery([{ name: 'categoryName', value: e.target.value }])
                            //     setCategory(e.target.value)
                            // }}
                            required
                            className="w-full mt-1 px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select category</option>
                            {
                                categoryOptions?.map((item, index) => <option className="text-black" key={index} value={item.value}>{item.option}</option>)
                            }

                        </select>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="subCategory"
                            className="block text-sm font-medium text-gray-700"
                        >
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
                        {/* {editingCategory ? "Update" : "Submit"} */}
                        submit
                    </button>
                </form>
            </div>
            <div className="mt-10">
                <h3 className="text-2xl text-black text-center font-semibold mb-4">
                    Category List
                </h3>
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
                                {/* Display Category */}
                                <td className="py-3 px-6">{category.category}</td>

                                {/* Display Subcategories with Delete Option */}
                                <td className="py-3 px-6">
                                    <ul className="border-collapse ">
                                        {category.subCategory.map((sub, index) => (
                                            <li key={index} className="flex p-2 border justify-between items-center">
                                                {sub}
                                                <button
                                                    onClick={() => handleDeleteSubCategory(category._id, sub)}
                                                    className="ml-4  px-2 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCategory;
