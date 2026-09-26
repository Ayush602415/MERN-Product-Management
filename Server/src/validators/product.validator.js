const { body, param, validationResult } = require('express-validator')

const productValidator = [
    body("title")
            .exists().withMessage("Tile is required").bail()
            .isString().withMessage("Title must be string").bail()
            .trim()
            .isLength({min:2,max:50}).withMessage("Title length must be between 2 and 50").bail()
            .isAlpha("en-US",{ignore: " -"}).withMessage("Title can only have smallcase and capital characters"),
    body("description")
            .exists().withMessage("Description is required").bail()
            .isString().withMessage("Description must be string").bail()
            .trim()
            .isLength({min:20,max:500}).withMessage("Description length must be between 20 and 500"),
    body('price')
        .exists().withMessage("Price is required").bail()
        .isInt({min: 0}).withMessage("Price must be integer"),
    body('stock')
        .exists().withMessage("Stocks are required").bail()
        .isInt({min: 0}).withMessage("Stocks must be integer").bail(),

    (req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid details",
                errors: errors.array()  
            })
        }
        next()
    }
]

module.exports = {
    productValidator,
}