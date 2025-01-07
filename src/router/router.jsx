import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layout/MainLayouts";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SingIn from "../pages/SingIn/SingIn";
import PrivateRoute from "./PrivateRoute";
import AllItems from "../pages/AllItems/AllItems";
import ItemsDetails from "../pages/ItemsDetailes/ItemsDetailes";
import AllRecoverd from "../pages/AllRecoverd/AllRecoverd";
import LostItems from "../pages/LostItems/LostItems";
import AddItems from "../pages/AddItems/AddItems";
import UpdateItem from "../pages/UpdateItem/UpdateItem";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayouts />,  
        errorElement: <ErrorPage />, 
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/allItems",
                element: <AllItems />,
                loader: () => fetch('http://localhost:3000/items')
            },
            {
                path:"/updateItems/:id",
                element: <PrivateRoute> <UpdateItem/> </PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:3000/items/${params.id}`)

            },
            {
                path: "/addItems",
                element: (
                    <PrivateRoute>
                        <AddItems />
                    </PrivateRoute>
                ), 
            },
            {
                path: "/allRecoverd",
                element: <PrivateRoute><AllRecoverd /></PrivateRoute>
            },
            {
                path: "/myItems",
                element: (
                    <PrivateRoute>
                        <LostItems />
                    </PrivateRoute>
                ), 
            },
            {
                path: "/items/:id",
                element: (
                    <PrivateRoute>
                        <ItemsDetails />
                    </PrivateRoute>
                ),
                loader: ({ params }) => fetch(`http://localhost:3000/items/${params.id}`),
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/singin",
                element: <SingIn />
            }
        ]
    }
]);

export default router;
