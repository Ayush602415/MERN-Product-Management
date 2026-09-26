const imagekit = require("../config/imagekit")
const productModel = require("../models/product.model")


const createProductController = async(req,res)=>{
    const {title , description , price , stock} = req.body

    if(!req.file){
        return res.status(400).json({
            message: "Image not found"
        })
    }

   const uploadImage = await imagekit.files.upload({
    file: req.file.buffer.toString("base64"),
    fileName: req.file.originalname
})

    const product = await productModel.create({
        title,
        description,
        price,
        stock,
        image: uploadImage.url
    })

    return res.status(201).json({
        message: 'Product created successfully',
        product
    })
}
const getAllProducts = async(req,res)=>{
    const products = await productModel.find()

    return res.status(200).json({
        message:"All Products fetched Successfully",
        products
    })
}

const getProductByIdController = async (req, res) => {
    const { id } = req.params

    const product = await productModel.findById(id)

    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }

    return res.status(200).json({
        product
    })
}

const updateProductController = async (req, res) => {
    try {
        console.log("UPDATE START")
        console.log("BODY:", req.body)
        console.log("FILE:", req.file?.originalname)

        const { id } = req.params
        const { title, description, price, stock } = req.body

        const product = await productModel.findById(id)

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        product.title = title
        product.description = description
        product.price = price
        product.stock = stock

        if (req.file) {
            console.log("UPLOADING TO IMAGEKIT")

            const uploadedImage = await imagekit.files.upload({
                file: req.file.buffer.toString("base64"),
                fileName: req.file.originalname
})

            console.log("IMAGEKIT RESPONSE:", uploadedImage)

            product.image = uploadedImage.url
        }

        await product.save()

        console.log("PRODUCT SAVED")

        return res.status(200).json({
            message: "Product updated successfully",
            product
        })

    } catch (error) {
        console.log("UPDATE ERROR:", error)

        return res.status(500).json({
            message: "Unable to update product",
            error: error.message
        })
    }
}

const deleteProductController = async (req, res) => {
    const { id } = req.params

    const product = await productModel.findByIdAndDelete(id)

    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }

    return res.status(200).json({
        message: 'Product deleted successfully'
    })
}

module.exports = {createProductController,getAllProducts,getProductByIdController,updateProductController,deleteProductController}