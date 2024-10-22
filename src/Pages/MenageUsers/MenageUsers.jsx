import { useDeleteAUserMutation, useGetAllUsersQuery } from "../../Redux/Features/Auth/authApi";

const MenageUsers = () => {
    const { data, refetch } = useGetAllUsersQuery()
    const [deleteUser] = useDeleteAUserMutation()
    const handelDelete = async (id) => {
        var proceed = confirm("Do you want to delete User?");
        if (proceed) {
            const res = await deleteUser(id)
            if (res) {
                refetch()
            }
        }
    }

    return (
        <div className="overflow-x-auto px-2">
            <h1 className="text-center font-semibold text-xl lg:text-2xl mt-2" >All Users</h1>
            <table className="min-w-full text-white border border-gray-400 rounded-md mt-8 bg-black ">
                <thead className="">
                    <tr>
                        <th>#</th>
                        <th className="py-2 px-4 border border-gray-400">UserName</th>
                        <th className="py-2 px-4 border border-gray-400">Dollar</th>
                        <th className="py-2 px-4 border border-gray-400">Role</th>
                        <th className="py-2 px-4 border border-gray-400">Action</th>
                    </tr>
                </thead>
                <tbody className=" text-center">
                    {data?.data?.map((product, index) => (
                        <tr key={product._id}>

                            <td className="py-2 px-4 border border-gray-400">{index + 1}</td>
                            <td className="py-2 px-4 border border-gray-400">{product.userName}</td>
                            <td className="py-2 px-4 border border-gray-400">{product.dollar}</td>
                            <td className="py-2 px-4 border border-gray-400">{product.role}</td>
                            <td className="py-2 px-4 border border-gray-400 mx-auto">
                                <button
                                    disabled={product.role === 'admin' || ''}
                                    onClick={() => handelDelete(product._id)}
                                    className="cursor-pointer text-red-500 hover:text-red-700 px-2 py-1 rounded-md transition-colors duration-300 ml-4"
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MenageUsers;