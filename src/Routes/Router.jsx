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


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
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
                element: <AddFunds/>
            },

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