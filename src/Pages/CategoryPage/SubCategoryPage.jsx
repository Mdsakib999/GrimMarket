import { useParams } from "react-router-dom";
import { capitalizeBusinessWise } from "../../utils/capitalizeBusinessWise";
import { useGetProductsQuery } from "../../Redux/Features/Products/productApi";
import Loading from "../../Components/Loading/Loading";
import Card from "../../Components/Card/Card";

const SubCategoryPage = () => {
    const { category, subCategory } = useParams()
    const params = capitalizeBusinessWise(subCategory)
    const path = capitalizeBusinessWise(category)
    const { data, isLoading } = useGetProductsQuery([{ name: 'categoryName', value: path }, { name: 'subCategoryName', value: params }])
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="relative py-3 ps- ">
            <div className="w-full fixed top-[66px] z-10 bg-[#181c30]  ">
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

export default SubCategoryPage;