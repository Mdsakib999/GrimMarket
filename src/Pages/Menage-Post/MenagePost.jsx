import { useState } from "react";
import moment from "moment";
import { useDeletePostMutation, useGetPostQuery } from "../../Redux/Features/Post/postApi";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import ViewPost from "../../Components/MenagePostComponents/ViewPost";
import EditPost from "../../Components/MenagePostComponents/EditPost";

const MenagePost = () => {
    const { data, error, isLoading, refetch } = useGetPostQuery(undefined, { refetchOnMountOrArgChange: true });
    const [deletePost] = useDeletePostMutation()
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [postData, setPostData] = useState(null)

    const closeModal = () => {
        setShowModal(false)
        setSelectedPost(null)
        setPostData(null)
    }
    const handleDelete = async (id) => {
        var proceed = confirm("Are you sure you want to Delete Post");
        if (proceed) {
            const res = await deletePost(id)
            if (res?.data) {
                refetch()
            }
        }
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading posts</p>;

    return (
        <div className="overflow-x-auto">
            {data?.data?.length ? (
                data?.data?.map((post) => (
                    <table key={post._id} className="min-w-full bg-white border border-gray-200 text-black mb-6">
                        <thead>
                            <tr>
                                <th className="text-left py-3 px-4 bg-gray-100 border-b border-gray-200">Field</th>
                                <th className="text-left py-3 px-4 bg-gray-100 border-b border-gray-200">Value</th>
                                <th className="text-left py-3 px-4 bg-gray-100 border-b border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3 px-4 border-b border-gray-200 font-semibold">Post ID</td>
                                <td className="py-3 px-4 border-b border-gray-200">{post._id}</td>
                                <td className="py-3 px-4 border-b border-gray-200">
                                    <button
                                        className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md"
                                        onClick={() => {
                                            setShowModal(true)
                                            setSelectedPost(post)
                                        }}
                                    >
                                        <FaEye className="inline" /> View
                                    </button>
                                    <button onClick={() => {
                                        setShowModal(true)
                                        setPostData({ postData: post?.postData, id: post?._id })
                                    }} className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md">
                                        <FaEdit className="inline" /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(post?._id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md">
                                        <FaTrashAlt className="inline" /> Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 border-b border-gray-200 font-semibold">Created At</td>
                                <td className="py-3 px-4 border-b border-gray-200">
                                    {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 border-b border-gray-200 font-semibold">Updated At</td>
                                <td className="py-3 px-4 border-b border-gray-200">
                                    {moment(post.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))
            ) : (
                <p>No posts found</p>
            )}

            {/* Modal for viewing post details */}
            {
                showModal ? (
                    <>
                        <div
                            className="justify-center  text-black items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative md:w-[50%] my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">

                                            {
                                                selectedPost ? "Post Details" : 'Edit Post'
                                            }
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={closeModal}
                                        >
                                            <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    {
                                        selectedPost && <ViewPost selectedPost={selectedPost} closeModal={closeModal} />
                                    }
                                    {
                                        postData && <EditPost data={postData} refetch={refetch} />
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null
            }
        </div>
    );
};

export default MenagePost;
