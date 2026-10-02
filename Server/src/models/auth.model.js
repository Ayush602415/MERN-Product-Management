const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
        default:null
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},{timestamps:true})

const userModel = mongoose.model("User_data",userSchema)
module.exports = userModel
