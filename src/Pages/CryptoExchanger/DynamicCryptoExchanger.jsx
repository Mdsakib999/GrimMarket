import { useLocation, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../Redux/Features/Products/productApi";
import { capitalizeBusinessWise } from "../../utils/capitalizeBusinessWise";
import News from "../../Components/News/News";

const DynamicCryptoExchanger = () => {
    const { dynamic } = useParams()
    const params = capitalizeBusinessWise(dynamic)
    const location = useLocation()
    const categoryName = capitalizeBusinessWise(location.pathname.split('/')[1])
    console.log(categoryName);
    console.log(params);
    const { data, isLoading } = useGetProductsQuery([{ name: 'categoryName', value: categoryName }, { name: 'subCategoryName', value: params }])

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

export default DynamicCryptoExchanger;