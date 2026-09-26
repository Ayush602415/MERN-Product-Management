import React, { useEffect, useState } from "react"
import api from "../api/api"
import { useNavigate } from "react-router"
import Navbar from "../Components/Navbar"
import { toast } from "react-toastify"

const Products = () => {

    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState([])

    const getAllProducts = async () => {
        try {
            const response = await api.get("/products")

            setProducts(response.data.products)
        } catch (error) {
            setErrors(error.response?.data?.errors || [
                {
                    msg: error.response?.data?.message || "Unable to load products"
                }
            ])
        }
    }

    const handleDelete = async(id)=>{
      try {
        await api.delete(`/products/${id}`)
        getAllProducts()

      } catch (error) {
         setErrors(error.response?.data?.errors || [
                {
                    msg: error.response?.data?.message || "Unable to delete products"
                }
            ])
         toast.error("Admin can only delete")
      }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (

      <>
         <Navbar />

         <div className="min-h-screen bg-slate-950 px-6 py-10">

            <div className="max-w-7xl mx-auto flex items-center justify-between mb-10">

              
        
                

                <div>
                    <p className="text-blue-500 text-sm font-semibold tracking-wider">
                        SHOPFLOW
                    </p>

                    <h1 className="text-4xl font-bold text-white mt-1">
                        Products
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Explore our latest products
                    </p>
                </div>
            
            </div>

            {/* Errors */}

            {errors.length > 0 && (
                <div className="max-w-7xl mx-auto mb-6 space-y-2">
                    {errors.map((error, index) => (
                        <p
                            key={index}
                            className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl"
                        >
                            {error.msg}
                        </p>
                    ))}
                </div>
            )}

            {/* Products */}

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {products.map((product) => (

                    <div
                        key={product._id}
                        className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                    >

                        <div className="h-70 bg-slate-900 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                        <div className="p-5">

                            <div className="flex items-start justify-between gap-3">

                                <h2 className="text-xl font-semibold text-white truncate">
                                    {product.title}
                                </h2>

                                <span
                                    className={`shrink-0 text-xs px-2 py-1 rounded-lg ${
                                        product.stock > 0
                                            ? "bg-green-500/10 text-green-400"
                                            : "bg-red-500/10 text-red-400"
                                    }`}
                                >
                                    {product.stock > 0 ? "In Stock" : "Out"}
                                </span>

                            </div>

                            <p className="text-slate-400 text-sm mt-3 line-clamp-2 min-h-10">
                                {product.description}
                            </p>

                            <div className="flex items-end justify-between mt-6">

                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                                        Price
                                    </p>

                                    <p className="text-2xl font-bold text-blue-500 mt-1">
                                        ₹{product.price}
                                    </p>
                                </div>

                                <p className="text-sm text-slate-400">
                                    Stock: {product.stock}
                                </p>

                            </div>

                            <div className="flex gap-3 mt-6">

                                <button
                                    onClick={() => navigate(`/products/editProduct/${product._id}`)}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2.5  cursor-pointer rounded-xl transition"
                                >
                                    Edit
                                </button>

                                <button
                                  onClick={()=>handleDelete(product._id)}
                                    className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer py-2.5 rounded-xl transition"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {products.length === 0 && errors.length === 0 && (
                <div className="max-w-7xl mx-auto text-center py-20">
                    <p className="text-slate-500 text-lg">
                        No products found
                    </p>
                </div>
            )}

        </div>
      </>
        
    )
}

export default Products