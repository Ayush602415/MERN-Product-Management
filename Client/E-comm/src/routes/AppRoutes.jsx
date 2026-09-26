import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AddProduct from '../products/AddProduct'
import EditProduct from '../products/EditProduct'
import Products from '../products/products'
import Public from '../Protected/Public'
import Private from '../Protected/Private'




const AppRoutes = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Public />,
            children: [
                {
                    index: true,
                    element: <Login />
                },
                {
                    path: "register",
                    element: <Register />
                }
            ]
        },
        {
            path: "/products",
            element: <Private />,
            children: [
                {
                    index: true,
                    element: <Products />
                },
                {
                    path: "addProducts",
                    element: <AddProduct />
                },
                {
                    path: "editProduct/:id",
                    element: <EditProduct />
                }
            ]
        }
    ])

    return <RouterProvider router={router} />
}

export default AppRoutes