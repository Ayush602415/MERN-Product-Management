const mongoose = require('mongoose')
const config = require('./config')

const ConnectDb = async()=>{
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log("Database running")
    } catch (error) {
        console.log("Data base error: ",error)
    }
}
module.exports = ConnectDb