import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
    return (
        <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-blue-500 text-4xl" />
        </div>
    );
};

export default Spinner;