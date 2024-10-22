/* eslint-disable react/prop-types */
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { useUpdatePostMutation } from "../../Redux/Features/Post/postApi";

const EditPost = ({ data, refetch }) => {
    const editor = useRef(null);
    const [content, setContent] = useState(data?.postData); // Initialize with the current post content
    const [updatePost] = useUpdatePostMutation(); // Hook to update the post
    const [loading, setLoading] = useState(false); // Loading state

    // Function to handle the update process
    const handleUpdate = async () => {
        setLoading(true);
        const toastId = toast.loading('Updating post...'); // Show loading toast

        const updatePayload = { postData: content }; // Prepare the data to update
        const id = data?.id; // Get the post id
        console.log({ payload: updatePayload, id });

        try {
            const res = await updatePost({ payload: updatePayload, id });

            if (res?.data) {
                toast.success('Post updated successfully', { id: toastId });
                setLoading(false);
                refetch()
            } else {
                throw new Error(res?.error?.data?.message || 'Update failed');
            }
        } catch (error) {
            toast.error(error.message || 'Error updating post', { id: toastId });
            setLoading(false);
        }
    };

    return (
        <div className="py-4">
            <div className='md:w-full mx-auto text-black '>
                {/* Jodit Editor */}
                <JoditEditor
                    ref={editor}
                    value={content} // Set initial content
                    className='h-[500px]'
                    tabIndex={1}
                    onChange={newContent => setContent(newContent)} // Capture changes in real-time
                />
            </div>

            {/* Update Button */}
            <div className='flex justify-end me-2 mt-4'>
                <button
                    disabled={loading} // Disable the button if loading
                    onClick={handleUpdate} // Handle update on click
                    className={`w-fit py-2 px-4 text-white font-semibold rounded-md shadow-md transition 
                        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} 
                        flex items-center justify-center`}
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin mr-2" />
                            Updating...
                        </>
                    ) : (
                        'Update'
                    )}
                </button>
            </div>
        </div>
    );
};

export default EditPost;
