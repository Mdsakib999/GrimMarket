/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivetRoutes = ({ children }) => {
    const { token } = useSelector((state) => state.auth)
    if (!token) {
        return <Navigate to={'/login'} />
    }


    return children
};

export default PrivetRoutes;