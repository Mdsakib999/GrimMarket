import { useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../../Redux/Features/Products/productApi";
import Card from "../../Components/Card/Card";
import { capitalizeBusinessWise } from "../../utils/capitalizeBusinessWise";
const Accounts = () => {
    const { data, isLoading } = useGetProductsQuery([{ name: 'categoryName', value: 'Accounts' }])
    const location = useLocation()
    console.log(location.pathname.split('/').join(''));
    const path = capitalizeBusinessWise(location.pathname.split('/').join(''))
    console.log(data);
    if (isLoading) {
        return <div>Loading........</div>
    }
    return (
        <div className="relative py-10  ">
            <div className="w-full fixed top-[65px] z-10 bg-[#181c30]  bg-opacity-95">
                <div className="flex items-center p-4 ">
                    <p className="text-base md:text-2xl  inline-block border-white">{path}</p>
                    <span className="bg-white inline-block h-[40px] w-[3px] mx-5">,</span>
                    <p className=" text-sm md:text-xl  inline-block border-white">All Products of {path}</p>
                </div>
            </div>
            <div className="flex flex-wrap  justify-evenly  ">
                {
                    data?.data?.map((item, index) => <Card key={index} data={item} />
                    )}
            </div>
        </div>
    );
};

export default Accounts;