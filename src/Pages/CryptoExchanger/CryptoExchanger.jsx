
import { useLocation } from 'react-router-dom';
import { capitalizeBusinessWise } from '../../utils/capitalizeBusinessWise';
import { useGetProductsQuery } from '../../Redux/Features/Products/productApi';
import Card from '../../Components/Card/Card';

const CryptoExchanger = () => {
    const location = useLocation()
    const categoryName = capitalizeBusinessWise(location.pathname.split('/')[1])
    const { data, isLoading } = useGetProductsQuery([{ name: 'categoryName', value: categoryName },])
    const path = capitalizeBusinessWise(location.pathname.split('/')[1])
    if (isLoading) {
        return <div>Loading........</div>
    }
    return (
        <div className="relative py-3 ps-3 ">
            <div className="w-full fixed top-[66px] z-20 bg-[#1F2025]  ">
                <div className="flex items-center p-4">
                    <p className="text-2xl  inline-block  border-white">{path}</p>
                    <span className="bg-white inline-block h-[40px] w-[3px] mx-5">,</span>
                    <p className="text-2xl  inline-block border-white">{path}</p>
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

export default CryptoExchanger;