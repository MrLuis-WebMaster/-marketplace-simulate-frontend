import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing/Page";
import NotFound from "./pages/NotFound";
import LayoutWithMenu from "./layout/LayoutWithMenu";
import Products from "./pages/Products/Page";
import Login from "./pages/Login/Page";
import SignUp from "./pages/SignUp/Page";
import Seller from "./pages/SignUp/Seller/Page";
import Customer from "./pages/SignUp/Customer/Page";
import PrivateRoute from "./components/PrivatedRoute";
import Dashboard from "./pages/Dashboard/Page";
import CreateProduct from "./pages/Dashboard/CreateProduct/Page";
import ProductsDashboard from "./pages/Dashboard/Products/Page";
import LayoutDashboard from "./layout/LayoutDashboard";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <LayoutWithMenu />,
            errorElement: <NotFound/>,
            children: [
                {     
                    path: "/",
                    element: <Landing />,
                },
                {     
                    path: "/products",
                    element: <Products />,
                }
            ]
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/sign-up",
            element: <SignUp />,
            children: [
                {
                    path: "seller",
                    element: <Seller />,
                },
                {
                    path: "customer",
                    element: <Customer />,
                }
            ]
        },
        {
            path: "/dashboard",
            element: <PrivateRoute><LayoutDashboard /></PrivateRoute>,
            errorElement: <NotFound />,
            children: [
                {
                    path:'',
                    element: <Dashboard />,
                },
                {
                    path: "create-product",
                    element: <CreateProduct />,
                },
                {
                    path: "products",
                    element: <ProductsDashboard />,
                }
            ]
        },
    ]
);

export default router