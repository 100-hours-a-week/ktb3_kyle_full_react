import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { path: "/login", element: <Login/> }
        ]
    }
]);