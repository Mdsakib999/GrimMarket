import { useLocation, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../Redux/Features/Products/productApi";
import { capitalizeBusinessWise } from "../../utils/capitalizeBusinessWise";
import Card from "../../Components/Card/Card";

const DynamicCryptoExchanger = () => {
    const { dynamic } = useParams()
    const params = capitalizeBusinessWise(dynamic)
    const location = useLocation()
    const categoryName = capitalizeBusinessWise(location.pathname.split('/')[1])
    const path = capitalizeBusinessWise(location.pathname.split('/')[1])
    const { data, isLoading } = useGetProductsQuery([{ name: 'categoryName', value: categoryName }, { name: 'subCategoryName', value: params }])
    console.log(params);
    if (isLoading) {
        return <div>Loading........</div>
    }
    return (
        <div className="relative py-3">
            <div className="w-full fixed top-[65px] z-10 bg-[#181c30]  bg-opacity-95  ">
                <div className="flex items-center p-4">
                    <p className="text-lg md:text-xl lg:text-2xl inline-block  border-white">{path}</p>
                    <span className="bg-white inline-block h-[40px] w-[3px] mx-5">,</span>
                    <p className="text-lg md:text-xl lg:text-2xl inline-block border-white">{params}</p>
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

export default DynamicCryptoExchanger;