const bcrypt = require('bcryptjs')
const userModel = require('../models/auth.model')

const { readRefreshToken, createAccessToken, createRefreshToken } = require('../utils/auth.utils')

const registerController = async(req,res)=>{
    const {name , email , password} = req.body

    const Alreadyuser = await userModel.findOne({email})

    if(Alreadyuser){
        return res.status(409).json({
            message: "User already exist"
        })
    }

   const user = await userModel.create({
        name,
        email,
        passwordHash: await bcrypt.hash(password,12)
    })

    const accessToken = createAccessToken({
            userId: user._id,
            role: user.role
        })
    
    const refreshToken  = createRefreshToken({
            userId: user._id,
            role: user.role
        })
  res.cookie("refreshToken",refreshToken,{httpOnly:true})


   await userModel.findByIdAndUpdate(user._id,{
    refreshToken
   })

    return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken
        });
}

const loginController = async(req,res)=>{
    const {email , password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(409).json({
            message: "Invalid email or Password"
        })
    }

   const isPasswordCorrect = await bcrypt.compare(
        password,
        user.passwordHash
    )

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const accessToken = createAccessToken({
        userId: user._id,
        role: user.role
    })
    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user.role
    })

    res.cookie("refreshToken",refreshToken,{httpOnly: true})

    await userModel.findByIdAndUpdate(user._id, {
    refreshToken
})

    return res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        accessToken
    })
}

const refreshTokenController = async(req,res)=>{
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken){
        return res.status(401).json({
            message: "RefreshToken Not found"
        })
    }

    try {
        const decoded = readRefreshToken(refreshToken)
        const {userId,role} = decoded
        const user = await userModel.findById(userId)

        if(refreshToken!=user.refreshToken){
            await userModel.findByIdAndUpdate(user._id,{
                refreshToken: null
            })

            return res.status(404).json({
                message: "RefreshToken mismatch"
            })
        }

        const accessToken = createAccessToken({
            userId: user._id,
            role: user.role
        })

        const newrefreshToken = createRefreshToken({
            userId: user._id,
            role: user.role
        })

        await userModel.findByIdAndUpdate(user._id, {
       refreshToken: newrefreshToken
})

        res.cookie("refreshToken",newrefreshToken,{httpOnly:true})

        res.status(201).json({
            message: "RefreshToken rotated successfully",
            data:{
                user:{
                userId: user._id,
                name: user.name,
                email: user.email
                }
            },
            accessToken
        })

    } catch (error) {
        return res.status(401).json({
            message: "Invalid Refresh Token"
        })
    }
}

const getmeController = async(req,res)=>{

    const {userId,role} = req.user
    const user = await userModel.findById(userId)
    res.status(200).json({
        message: "User Data find Successfully",
        data:{
            user:{
                email: user.email,
                name: user.name,
                role: user.role,
                id: user._id
            }
        }
    })
}

const logoutController = async(req,res)=>{
    const {userId,role} = req.user
    const user = await userModel.findById(userId)
      if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }
    user.refreshToken =null
    await user.save()
    res.clearCookie('refreshToken')

    return res.status(200).json({
        message: 'Logout successful'
    })

}



module.exports = {registerController,loginController,refreshTokenController,getmeController,logoutController}