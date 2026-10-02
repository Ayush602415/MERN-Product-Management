const express  = require("express")

const { productValidator } = require("../validators/product.validator")
const { createProductController, getAllProducts, getProductByIdController, updateProductController, deleteProductController } = require("../controllers/product.controller")
const authenticate = require("../middleware/auth.middleware")
const upload = require("../middleware/upload.middleware")
const adminOnly = require("../middleware/admin.middleware")


const productRouter = express.Router()

productRouter.post("/",authenticate,adminOnly,upload.single('image'),productValidator,createProductController)
productRouter.get("/",getAllProducts)
productRouter.get("/:id",getProductByIdController)
productRouter.put("/:id",authenticate,adminOnly,upload.single("image"),productValidator,updateProductController)
productRouter.delete("/:id",authenticate,adminOnly ,deleteProductController)

module.exports = productRouter
