import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logOut } from "../Redux/Features/Auth/authSlice";

const AdminRoutes = ({ children }) => {
    const { token, role } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    if (!token || role !== 'admin') {
        dispatch(logOut())
        return <Navigate to={'/login'} />
    }
    return children
};

export default AdminRoutes;