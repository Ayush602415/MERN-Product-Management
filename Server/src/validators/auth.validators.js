const {body, validationResult} = require('express-validator')

const registerValidator = [
    body("name")
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be in string").bail()
        .trim()
        .isLength({min: 2,max:50}).withMessage("Name must be between 2 and 50 characters"),
    body("email")
        .exists().withMessage("Email is required").bail()
        .trim()
        .isEmail().withMessage("Invalid email credentials"),
    body("password")
        .exists().withMessage("Password is required").bail()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("confirmPassword")
        .exists().withMessage("Confirmation of password is required").bail()
         .custom((value, { req }) => value === req.body.password).withMessage("PAssword do not match"),
    (req,res,next)=>{
        const errors  = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalid details",
                errors: errors.array()
            })
        }
        next()
    }
]

const loginValidator = [
     body("email")
        .exists().withMessage("Email is required").bail()
        .trim()
        .isEmail().withMessage("Invalid email credentials"),
    body("password")
        .exists().withMessage("Password is required").bail(),
     (req,res,next)=>{
        const errors  = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalid details",
                errors: errors.array()
            })
        }
        next()
    }
]
module.exports = {registerValidator,loginValidator}