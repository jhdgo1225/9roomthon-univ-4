import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "./pages/LoginPage.tsx";
import Main from "./pages/MainPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Main,
    },
    {
        path: "/login",
        Component: Login,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
