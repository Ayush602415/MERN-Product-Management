import axios from "axios";

const api = axios.create({
    baseURL: "https://mern-product-management-jva6.vercel.app/api",
    withCredentials: true
})

export default api

api.interceptors.request.use((config)=>{
    const accessToken =  localStorage.getItem("accessToken")
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

api.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest = error.config

            if (
    error.response?.status === 401 &&
    !originalRequest._retry &&
    !originalRequest.url.includes("/auth/refresh") &&
    !originalRequest.url.includes("/auth/login") &&
    !originalRequest.url.includes("/auth/register")
 ) {
            originalRequest._retry = true

            try {
                const response = await api.post("/auth/refresh")
                const newAccessToken = response.data.accessToken
                 localStorage.setItem("accessToken", newAccessToken)

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                return api(originalRequest)

            } catch (error) {
                 localStorage.removeItem("accessToken")

                window.location.href = "/"

                return Promise.reject(error)
            }
        }
         return Promise.reject(error)
    }
)