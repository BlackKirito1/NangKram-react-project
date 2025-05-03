
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import NotFoundPage from "../routes/NotFoundPage"

import Layout from "../layouts/Layout"
import Home from "../pages/Home"
import Login from "../pages/auth/Login"
import Products from "../pages/Products"
import Contact from "../pages/Contact"
import About from "../pages/About"

import LayoutAdmin from "../layouts/LayoutAdmin"
import ProtectRouteAdmin from "./ProtectRouteAdmin"
import FormCategory from "../components/admin/FormCategory"
import FormEditCategory from "../components/admin/FormEditCategory"
import FormProduct from "../components/admin/FormProduct"
import FormEditProduct from "../components/admin/FormEditProduct"
import FormContent from "../components/admin/FormContent"
import FormEditContent from "../components/admin/FormEditContent"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "products", element: <Products /> },
            { path: "contact", element: <Contact /> },
            { path: "about", element: <About /> }
        ]
    },
    {
        path: "/admin",
        element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
        children: [
            { index: true, element: <FormCategory /> },
            { path: "categories/:id", element: <FormEditCategory /> },
            { path: "products", element: <FormProduct /> },
            { path: "products/:id", element: <FormEditProduct /> },
            { path: "contents", element: <FormContent /> },
            { path: "contents/:id", element: <FormEditContent /> }
        ]
    }
])

const AppRoutes = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
export default AppRoutes