import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ProductsUpdates from './../Components/News/ProductsUpdates';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <ProductsUpdates />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
])