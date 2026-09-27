const express = require('express')
const router = require('../routes/auth.routes')
const productRouter = require('../routes/product.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://mern-product-management-h9yh.vercel.app"
    ],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", router)
app.use("/api/products", productRouter)

module.exports = app