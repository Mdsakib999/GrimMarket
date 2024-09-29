import News from "../../Components/News/News";
import { useGetProductsQuery } from "../../Redux/Features/Products/productApi";

const EWallets = () => {

    const { data, isLoading } = useGetProductsQuery([{ name: 'categoryName', value: "E-Wallets" }])

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

export default EWallets;