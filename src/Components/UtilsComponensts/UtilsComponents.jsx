
const UtilsComponents = ({ title, description }) => {
    return (
        <div className=" ps-8 flex items-center gap-5 bg-[#111827] bg-opacity-65 py-2 fixed top-[66px] w-full z-10 " >
            <p className="text-xl">{title}</p>
            <span className="block bg-white w-[3px] h-[36px]"></span>
            <p>{description}</p>
        </div>
    );
};

export default UtilsComponents;