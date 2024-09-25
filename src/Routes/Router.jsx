import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ProductsUpdates from './../Components/News/ProductsUpdates';
import DynamicCreditCards from "../Pages/CreditCards/DynamicCreditCards";
import CreditCards from "../Pages/CreditCards/CreditCards";
import OnlineBanking from "../Pages/OnlineBanking/OnlineBanking";
import Accounts from "../Pages/Accounts/Accounts";
import DynamicAccounts from "../Pages/Accounts/DynamicAccounts";
import BankDrop from "../Pages/BankDrop/BankDrop";
import DynamicBankDrop from "../Pages/BankDrop/DynamicBankDrop";
import Keys from "../Pages/Keys/Keys";
import DynamicKeys from "../Pages/Keys/DynamicKeys";
import Esim from "../Pages/Esim/Esim";
import DynamicEsim from "../Pages/Esim/DynamicEsim";
import Support from "../Pages/Support/Support";
import Faq from "../Pages/Faq/Faq";


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
                path: "/credit-cards",
                element: <CreditCards />
            },
            {
                path: "/credit-cards/:dynamic",
                element: <DynamicCreditCards />
            },
            {
                path: '/online-banking',
                element: <OnlineBanking />
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
                path: "/bankdrop",
                element: <BankDrop />
            },
            {
                path: "/bankdrop/:dynamic",
                element: <DynamicBankDrop />
            },
            {
                path: "/keys",
                element: <Keys />
            },
            {
                path: "/keys/:dynamic",
                element: <DynamicKeys />
            },
            {
                path: "/eSim",
                element: <Esim />
            },
            {
                path: "/eSim/:dynamic",
                element: <DynamicEsim />
            },
            {
                path: "/support",
                element: <Support />
            },
            {
                path: "/faq",
                element: <Faq />
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