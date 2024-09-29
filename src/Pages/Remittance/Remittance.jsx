import { useLocation } from "react-router-dom";
import News from "../../Components/News/News";
import { useGetProductsQuery } from "../../Redux/Features/Products/productApi";
import { capitalizeBusinessWise } from "../../utils/capitalizeBusinessWise";

const Remittance = () => {
    const location = useLocation()
    const categoryName = capitalizeBusinessWise(location.pathname.split('/')[1])
    const { data, isLoading } = useGetProductsQuery([{ name: 'categoryName', value: categoryName }])

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

export default Remittance;