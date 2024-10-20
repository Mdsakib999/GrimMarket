/* eslint-disable react/prop-types */
import moment from 'moment';
const ViewPost = ({ selectedPost, closeModal }) => {
    return (
        <div className="bg-white p-6 text-black rounded-md shadow-md overflow-auto ">
            <p><strong>ID:</strong> {selectedPost?._id}</p>
            <p><strong>Created At:</strong> {moment(selectedPost.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
            <p><strong>Updated At:</strong> {moment(selectedPost.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
            <div className="prose max-w-none mt-4" dangerouslySetInnerHTML={{ __html: selectedPost.postData }} />
            <button
                onClick={closeModal}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
                Close
            </button>
        </div>
    );
};

export default ViewPost;