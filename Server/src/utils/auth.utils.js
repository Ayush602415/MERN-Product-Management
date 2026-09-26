const jwt = require('jsonwebtoken')
const config = require('../config/config')

const createAccessToken = ({ userId, role }) => {

    const accessToken = jwt.sign(
        { userId, role },
        config.ACCESS_SECRET_KEY,
        { expiresIn: '15m' }
    )

    return accessToken
}
const createRefreshToken = ({userId,role})=>{
    const refreshToken = jwt.sign({userId , role},config.REFRESH_SECRET_KEY,{expiresIn:"7d"})
    return refreshToken
}
const readRefreshToken = (token)=>{
    return jwt.verify(token,config.REFRESH_SECRET_KEY)
}
const readAccessToken = (token)=>{
    return jwt.verify(token,config.ACCESS_SECRET_KEY)
}
module.exports = {createAccessToken,createRefreshToken,readAccessToken,readRefreshToken}