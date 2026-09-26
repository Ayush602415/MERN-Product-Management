import React, { useState } from "react"
import { Link, useNavigate } from "react-router"
import api from "../api/api"
import { toast } from "react-toastify"

const Register = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        try {
            const response = await api.post("/auth/register", {
                name,
                email,
                password,
                confirmPassword
            })


            navigate("/")
            toast.success("User Registerd Successfully")
        } catch (error) {
            setErrors(error.response?.data?.errors || [
                {
                    msg: error.response?.data?.message || "Something went wrong"
                }
            ])
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">

            <div className="w-full max-w-md">

                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-white">
                        Shop<span className="text-blue-500">Flow</span>
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Create your account to get started.
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">

                    <h2 className="text-2xl font-semibold text-white mb-6">
                        Create account
                    </h2>

                    {errors.length > 0 && (
                        <div className="mb-5 space-y-2">
                            {errors.map((error, index) => (
                                <p
                                    key={index}
                                    className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg"
                                >
                                    {error.msg}
                                </p>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition"
                        >
                            Create Account
                        </button>

                    </form>

                    <p className="text-center text-sm text-slate-400 mt-6">
                        Already have an account?

                        <Link
                            to="/"
                            className="text-blue-500 hover:text-blue-400 ml-1"
                        >
                            Sign in
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Register