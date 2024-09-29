import { useLocation } from "react-router-dom";
import News from "../../Components/News/News";
import { useGetProductsQuery } from "../../Redux/Features/Products/productApi";
const Accounts = () => {
    const { data, isLoading } = useGetProductsQuery([{ name: 'categoryName', value: 'Account' }])
    const location = useLocation()
    console.log(location);
    if (isLoading) {
        return <div>Loading........</div>
    }
    return (
        <div>
            <p></p>
            <div className="flex flex-wrap">
                {
                    data?.data?.map((item, index) => <News key={index} data={item} />
                    )}
            </div>
        </div>
    );
};

export default Accounts;