import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../Redux/Features/Products/productApi";
import News from "../../Components/News/News";
import { capitalizeBusinessWise } from "../../utils/capitalizeBusinessWise";

const DynamicAccounts = () => {
    const { dynamic } = useParams()
    const params = capitalizeBusinessWise(dynamic)
    // const location = useLocation()
    // const categoryName = capitalizeBusinessWise(location.pathname.split('/')[1])
    const { data, isLoading } = useGetProductsQuery([{ name: 'categoryName', value: "Account" }, { name: 'subCategoryName', value: params }])
    console.log(data);
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

export default DynamicAccounts;

