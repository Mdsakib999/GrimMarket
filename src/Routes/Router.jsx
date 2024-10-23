import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Support from "../Pages/Support/Support";
import Faq from "../Pages/Faq/Faq";
import PrivetRoutes from './PrivetRoutes';
import Settings from "../Pages/Settings/Settings";
import Referrals from "../Pages/Referrals/Referrals";
import AddProduct from "../Pages/Add_Product/AddProduct";
import AdminRoutes from "./AdminRoutes";
import MenageProduct from "../Pages/Menage_Product/MenageProduct";
import MenageUsers from "../Pages/MenageUsers/MenageUsers";
import Order from "../Pages/Order/Order";
import Checkout from "../Pages/Checkout/Checkout";
import Home from "../Pages/Home/Home";
import CreatePost from "../Pages/CreatePost/CreatePost";
import MenagePost from "../Pages/Menage-Post/MenagePost";
import CategoryPage from "../Pages/CategoryPage/CategoryPage";
import SubCategoryPage from "../Pages/CategoryPage/SubCategoryPage";
import AddFunds from './../Pages/Navbar/Profile/AddFunds';
import MenageCategory from "../Pages/MenageCategory/MenageCategory";
import MenageSubCategory from "../Pages/MenageSubCategory/MenageSubCategory";
import CardDetails from "../Components/Card/CardDetails";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivetRoutes><MainLayout /></PrivetRoutes>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/:category',
                element: <CategoryPage />
            },
            {
                path: '/:category/:subCategory',
                element: <SubCategoryPage />
            },
            {
                path: '/details/:id',
                element: <CardDetails />
            },

            {
                path: "/support",
                element: <Support />
            },
            {
                path: "/faq",
                element: <Faq />
            },
            {
                path: "/addFunds",
                element: <AddFunds />
            },
            {
                path: "/order",
                element: <Order />
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/user/settings",
                element: <Settings />
            },
            {
                path: "/user/referrals",
                element: <Referrals />
            },
            {
                path: '/admin/add-product',
                element: <AdminRoutes><AddProduct /></AdminRoutes>
            },
            {
                path: '/admin/menage-product',
                element: <AdminRoutes><MenageProduct /></AdminRoutes>
            },
            {
                path: '/admin/menage-users',
                element: <AdminRoutes><MenageUsers /></AdminRoutes>
            },
            {
                path: '/admin/create-news',
                element: <AdminRoutes><CreatePost /></AdminRoutes>
            },
            {
                path: '/admin/menage-news',
                element: <AdminRoutes><MenagePost /></AdminRoutes>
            },
            {
                path: '/admin/menage-category',
                element: <AdminRoutes><MenageCategory /></AdminRoutes>
            },
            {
                path: '/admin/menage-subcategory',
                element: <AdminRoutes><MenageSubCategory /></AdminRoutes>
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