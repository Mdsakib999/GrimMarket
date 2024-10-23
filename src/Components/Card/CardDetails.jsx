import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../Redux/Features/Products/productApi";
import Loading from "../Loading/Loading";

const CardDetails = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetProductByIdQuery(id, { skip: !id })
    const cardData = data?.data
    const { title, image, price, quantity, _id } = !cardData ? { title: '', image: "", price: "", quantity: "", _id: "" } : cardData
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            {title}
        </div>
    );
};

export default CardDetails;