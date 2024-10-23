import { useState } from "react";
import {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation, // Add the update mutation
} from "../../Redux/Features/Category/categoryApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ManageCategory = () => {
  const [createCategory] = useCreateCategoryMutation();
  const { data: categories, isLoading, refetch } = useGetAllCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation(); // Add the update mutation

  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = e.target.category.value;

    if (editingCategory) {
      // If we are editing a category, update it
      const res = await updateCategory({
        id: editingCategory._id,
        data: { category },
      });
      if (res.data) {
        toast.success("Category updated successfully");
        setEditingCategory(null); // Reset editing state
        setNewCategoryName(""); // Reset form
        e.target.reset();
        refetch();
      } else {
        toast.error(res?.error?.data?.message);
      }
    } else {
      // If we are creating a new category
      const res = await createCategory({ category });
      if (res.data) {
        toast.success("Category created successfully");
        e.target.reset();
        setEditingCategory(null);
        setNewCategoryName("");
        refetch();
      } else {
        toast.error(res?.error?.data?.message);
      }
    }
  };

  const handleDelete = async (id) => {
    const proceed = confirm("Do you want to delete this category?");
    if (proceed) {
      const res = await deleteCategory(id);
      if (res.data) {
        toast.success("Category deleted successfully");
        refetch();
      } else {
        toast.error(res?.error?.data?.message);
      }
    }
  };

  const handleEdit = (category) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setEditingCategory(category); // Set the category to be edited
    setNewCategoryName(category.category); // Set the form input to current category name
  };

  if (isLoading) return <p>Loading categories...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-end">
        <Link
          to={"/admin/menage-subcategory"}
          className="bg-green-500 py-2 px-4 me-4 text-white font-semibold rounded-md shadow-md lg:text-lg hover:bg-green-600 "
        >
          {" "}
          Menage Sub-category's
        </Link>
      </div>
      <div className="max-w-md mx-auto mt-6 lg:mt-2 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl text-black font-semibold mb-4 text-center">
          {editingCategory ? "Edit Category" : "Add New Category"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="mt-1 block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter category name"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            {editingCategory ? "Update Category" : "Submit"}
          </button>
        </form>
      </div>

      {/* Categories Table */}
      <div className="mt-10 lg:w-[80%] mx-auto">
        <h3 className="text-2xl text-white text-center font-semibold mb-4">
          All Category List
        </h3>
        <table className="min-w-full bg-white text-black rounded-md">
          <thead>
            <tr className="border-b ">
              <th className="py-2 px-4 text-center">Category</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.data?.map((category) => (
              <tr key={category._id} className="border-b">
                <td className="py-2 px-4 text-center border-r">
                  {category.category}
                </td>
                <td className="py-2 px-4 text-center ">
                  <button
                    onClick={() => handleEdit(category)}
                    className="inline-flex justify-center py-2 px-4 mr-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </button>
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
