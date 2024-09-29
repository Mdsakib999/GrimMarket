import { useParams } from "react-router-dom";
import { capitalizeBusinessWise } from "../../utils/capitalizeBusinessWise";
import { useGetProductsQuery } from "../../Redux/Features/Products/productApi";
import News from "../../Components/News/News";

const DynamicEWallets = () => {
    const { dynamic } = useParams()
    const params = capitalizeBusinessWise(dynamic)
    const { data, isLoading } = useGetProductsQuery([{ name: 'categoryName', value: "E-Wallets" }, { name: 'subCategoryName', value: params }])

    if (isLoading) {
        return <div>Loading........</div>
    }
    return (
        <div className="flex flex-wrap">
            {
                data?.data?.map((item, index) => <News key={index} data={item} />
                )}
        </div>
    );
};

export default DynamicEWallets;