import { useLocation } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { useGetProductsQuery } from "../../Redux/Features/Products/productApi";
import { capitalizeBusinessWise } from "../../utils/capitalizeBusinessWise";

const EWallets = () => {
    const location = useLocation()
    const { data, isLoading } = useGetProductsQuery([{ name: 'categoryName', value: "E-Wallets" }])
    const path = capitalizeBusinessWise(location.pathname.split('/')[1])
    if (isLoading) {
        return <div>Loading........</div>
    }
    return (
        <div className="relative py-3 ps-3 ">
            <div className="w-full fixed top-[66px] z-20 bg-[#1F2025]  ">
                <div className="flex items-center p-4">
                    <p className="text-2xl  inline-block  border-white">{path.split(' ').join('-')}</p>
                    <span className="bg-white inline-block h-[40px] w-[3px] mx-5">,</span>
                    <p className="text-2xl  inline-block  border-white">{path.split(' ').join('-')}</p>
                </div>
            </div>
            <div className="flex flex-wrap justify-center">
                {
                    data?.data?.map((item, index) => <Card key={index} data={item} />
                    )}
            </div>
        </div>
    );
};

export default EWallets;