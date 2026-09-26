const mongoose = require('mongoose')

const productSchema =  mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    description:{
        type:String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 500
    },
    price:{
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true,
        trim: true
    }
},{timestamps: true})

const productModel = mongoose.model("Product",productSchema)
module.exports = productModel