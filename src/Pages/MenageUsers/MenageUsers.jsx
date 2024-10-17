import { useDeleteAUserMutation, useGetAllUsersQuery } from "../../Redux/Features/Auth/authApi";

const MenageUsers = () => {
    const { data, refetch } = useGetAllUsersQuery()
    const [deleteUser] = useDeleteAUserMutation()
    const handelDelete = async (id) => {
        const res = await deleteUser(id)
        if (res) {
            refetch()
        }
    }

    return (
        <div>
            <h1 className="text-center" >Menage Users</h1>
            <table className="min-w-full bg-white border rounded-md text-black mt-8 px-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th className="py-2 px-4 border">UserName</th>
                        <th className="py-2 px-4 border">Dollar</th>
                        <th className="py-2 px-4 border">Role</th>
                        <th className="py-2 px-4 border">Action</th>
                    </tr>
                </thead>
                <tbody className="text-black">
                    {data?.data?.map((product, index) => (
                        <tr key={product._id}>

                            <td className="py-2 px-4 border">{index + 1}</td>
                            <td className="py-2 px-4 border">{product.userName}</td>
                            <td className="py-2 px-4 border">{product.dollar}</td>
                            <td className="py-2 px-4 border">{product.role}</td>
                            <td className="py-2 px-4 border mx-auto">
                                <button
                                    disabled={product.role === 'admin'}
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