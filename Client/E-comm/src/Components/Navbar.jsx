import React from "react"
import { Link, useNavigate } from "react-router"
import api from "../api/api"
import { useState } from "react"
import { useEffect } from "react"

const Navbar = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const getUser = async()=>{
        try {
                const response =  await api.get("/auth/me")
                setUser(response.data.data.user)

        } catch (error) {
            console.log("ME Error: ",error)
        }
    }

    useEffect(()=>{
        getUser()
    },[])

    const handleLogout = async() => {
        try {
            await api.post("/auth/logout")
            localStorage.removeItem("accessToken")
            navigate("/")
        } catch (error) {
            console.log("Error in logout Api: ",error)
        }
    }

    return (
        <nav className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link to="/products" className="text-2xl font-bold text-white">
                    Shop<span className="text-blue-500">Flow</span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-3">

                    <Link
                        to="/products"
                        className="text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
                    >
                        Products
                    </Link>

                    <Link
                        to="/products/addProducts"
                        className="text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
                    >
                        Add Product
                    </Link>

                    {user && (
                        <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <p className="text-white text-sm font-semibold">
                                    {user.name}
                                </p>

                                <p className="text-slate-500 text-xs">
                                    {user.role}
                                </p>
                            </div>

                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg cursor-pointer transition"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    )
}

export default Navbar