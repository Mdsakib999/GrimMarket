import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ProductsUpdates from './../Components/News/ProductsUpdates';
import Accounts from "../Pages/Accounts/Accounts";
import DynamicAccounts from "../Pages/Accounts/DynamicAccounts";
import Support from "../Pages/Support/Support";
import Faq from "../Pages/Faq/Faq";
import CryptoExchanger from "../Pages/CryptoExchanger/CryptoExchanger";
import DynamicCryptoExchanger from "../Pages/CryptoExchanger/DynamicCryptoExchanger";
import EWallets from "../Pages/E-Wallets/EWallets";
import DynamicEWallets from "../Pages/E-Wallets/DynamicEWallets";
import Remittance from "../Pages/Remittance/Remittance";
import DynamicRemittance from "../Pages/Remittance/DynamicRemittance";
import AddFunds from "../Pages/Navbar/Profile/AddFunds";
import PrivetRoutes from './PrivetRoutes';
import Settings from "../Pages/Settings/Settings";
import Referrals from "../Pages/Referrals/Referrals";
import AddProduct from "../Pages/Add_Product/AddProduct";
import AdminRoutes from "./AdminRoutes";
import MenageProduct from "../Pages/Menage_Product/MenageProduct";
import MenageUsers from "../Pages/MenageUsers/MenageUsers";
import Order from "../Pages/Order/Order";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivetRoutes><MainLayout /></PrivetRoutes>,
        children: [
            {
                path: '/',
                element: <ProductsUpdates />
            },
            {
                path: "/accounts",
                element: <Accounts />
            },
            {
                path: "/accounts/:dynamic",
                element: <DynamicAccounts />
            },
            {
                path: '/crypto-exchanger',
                element: <CryptoExchanger />
            },
            {
                path: "/crypto-exchanger/:dynamic",
                element: <DynamicCryptoExchanger />
            },
            {
                path: '/e-wallets',
                element: <EWallets />
            },
            {
                path: "/e-wallets/:dynamic",
                element: <DynamicEWallets />
            },
            {
                path: '/remittance',
                element: <Remittance />
            },
            {
                path: "/remittance/:dynamic",
                element: <DynamicRemittance />
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