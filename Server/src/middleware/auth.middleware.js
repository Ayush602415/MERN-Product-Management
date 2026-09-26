const { readAccessToken } = require("../utils/auth.utils")

const authenticate = (req,res,next)=>{
    const accessToken = req.headers.authorization?.split(" ")[1]
    if(!accessToken){
        return res.status(401).json({
            message: "AccesssToken not found"
        })
    }


    try {
        const decoded = readAccessToken(accessToken)
        req.user = decoded
        next()
    } catch (error) {
         res.status(401).json({
        message: "Invalid or expire accessToken"
    })
    }
}

module.exports = authenticate