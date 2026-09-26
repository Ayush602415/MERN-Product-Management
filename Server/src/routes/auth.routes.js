const express = require('express')
const { registerValidator, loginValidator } = require('../validators/auth.validators')
const { registerController, loginController, refreshTokenController, getmeController, logoutController } = require('../controllers/auth.controller')
const authenticate = require('../middleware/auth.middleware')


const router = express.Router()

router.post("/register",registerValidator,registerController)
router.post("/login",loginValidator,loginController)
router.post("/refresh",refreshTokenController)
router.get("/me",authenticate,getmeController)
router.post("/logout", authenticate, logoutController)
module.exports = router