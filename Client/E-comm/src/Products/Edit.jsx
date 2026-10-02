
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import api from "../api/api"
import { toast } from "react-toastify"

const EditProduct = () => {

    const navigate = useNavigate()
    const {id} = useParams()
    const [image, setImage] = useState(null)
    const [title,setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [errors, setErrors] = useState([])

    const getAllProduct = async()=>{
        try {
            const response = await api.get(`/products/${id}`)
            const product = response.data.product

            setTitle(product.title)
            setDescription(product.description)
            setPrice(product.price)
            setStock(product.stock)


        } catch (error) { 
            setErrors(error.response?.data?.errors 
                || 
                [ 
                    { msg: error.response?.data?.message || "Unable to load product" } 
                ]) }
    }

    useEffect(()=>{
        getAllProduct()
    },[id])

   const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    try {
        const formData = new FormData()

        formData.append("title", title)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("stock", stock)

        if (image) {
            formData.append("image", image)
        }

        await api.put(`/products/${id}`, formData)

        navigate("/products")
        toast.success("Product Updated Successfully")

    } catch (error) {
        setErrors(error.response?.data?.errors || [
            {
                msg: error.response?.data?.message ||
                    "Unable to update product"
            }
        ])
        toast.error("Admin Can Only Edit")
    }
}

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">

            <div className="w-full max-w-2xl">

                <div className="mb-8">
                    <p className="text-blue-500 text-sm font-semibold tracking-wider">
                        SHOPFLOW
                    </p>

                    <h1 className="text-4xl font-bold text-white mt-1">
                        Edit Product
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Update your product details.
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">

                    {errors.length > 0 && (
                        <div className="mb-6 space-y-2">
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

                    <form onSubmit={ handleSubmit} className="space-y-6">
                        <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">
        Product Image
    </label>

    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-700 rounded-xl bg-slate-900 hover:bg-slate-800 hover:border-blue-500 transition cursor-pointer">

        <div className="text-center">
            <p className="text-slate-300 font-medium">
                Click to change image
            </p>

            <p className="text-sm text-slate-500 mt-1">
                PNG, JPG, JPEG
            </p>

            {image && (
                <p className="text-sm text-blue-400 mt-2">
                    {image.name}
                </p>
            )}
        </div>

        <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
        />
    </label>
</div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Product Title
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Description
                            </label>

                            <textarea
                                rows="5"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                        </div>

                        <div className="flex gap-4 pt-3">

                            <button
                                type="button"
                                onClick={() => navigate("/products")}
                                className="flex-1 bg-slate-800 hover:bg-slate-700  cursor-pointer text-white font-semibold py-3 rounded-xl transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={()=>navigate("/products")}
                                type="submit"
                                className="flex-1 bg-blue-600 hover:bg-blue-500 cursor-pointer text-white font-semibold py-3 rounded-xl transition"
                            >
                                Update Product
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    )

}
export default EditProduct

