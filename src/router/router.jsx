import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login.jsx";
import RootLayout from "./RootLayout.jsx";
import Signup from "../pages/Signup/Signup.jsx";
import { PostList } from "../pages/Post/PostList.jsx";
import { PostDetail } from "../pages/Post/PostDetail.jsx";
import { PostCreate } from "../pages/Post/PostCreate.jsx";
import { ProfileUpdate } from "../pages/User/ProfileUpdate.jsx";
import { PasswordUpdate } from "../pages/User/PasswordUpdate.jsx";
import { PostUpdate } from "../pages/Post/PostUpdate.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "login", element: <Login/> },
            { path: "signup", element: <Signup/> },
            { path: "posts", element: <PostList/> },
            { path: "posts/:postId", element: <PostDetail/> },
            { path: "posts/create", element: <PostCreate/> },
            { path: "posts/update/:postId", element: <PostUpdate/> },
            { path: "profile-update", element: <ProfileUpdate/> },
            { path: "password-update", element: <PasswordUpdate/> },
        ]
    }
]);
