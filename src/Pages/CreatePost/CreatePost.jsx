import { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { FaSpinner } from 'react-icons/fa';
import { useCreatePostMutation } from '../../Redux/Features/Post/postApi';
import toast from 'react-hot-toast';
const CreatePost = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [createPost] = useCreatePostMutation()
    const [loading, setLoading] = useState(false)
    const handlePost = async () => {
        setLoading(true)
        const toastId = toast.loading('loading..')
        const data = { postData: content }
        const res = await createPost(data)
        if (res.data) {
            setLoading(false)
            setContent('')
            toast.success('Create Post', { id: toastId })
        }
        else {
            toast.error('Some Error', { id: toastId })
        }

    }

    return (
        <div>
            <p className='text-2xl font-bold py-4 text-center' >Create Post</p>
            <div className='md:w-[80%] mx-auto text-black'>
                <JoditEditor
                    ref={editor}
                    value={content}
                    className='h-[500px]'
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                />
            </div>
            <div className='flex justify-end me-28 mt-4'>
                <button
                    disabled={loading}
                    onClick={handlePost}
                    className={`w-fit  py-2 px-4 text-white font-semibold rounded-md shadow-md transition 
    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} 
    flex items-center justify-center`}
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin mr-2" />
                            Loading...
                        </>
                    ) : (
                        'Submit'
                    )}
                </button>
            </div>

        </div>
    );
};

export default CreatePost;