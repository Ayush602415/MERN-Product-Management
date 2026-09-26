const ImageKit = require("@imagekit/nodejs")
const config = require("./config")


const imagekit = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY
})

module.exports = imagekit