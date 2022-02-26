const express = require("express")
const router = express.Router()

const LoginController = require('../controllers/auth/login')
const LogoutController = require('../controllers/auth/logout')
const RegisterController = require('../controllers/auth/register')
const AuthController = require('../controllers/auth')

router.route("/login").get(AuthController.loginPage)
router.route("/register").get(AuthController.registerPage)
router.route("/forgot-password").get(AuthController.forgotPasswordPage)
router.route("/recover-password/:token").get(AuthController.recoverPasswordPage)

router.route("/logout").get(LogoutController)
router.route("/login").post(LoginController)
router.route("/register").post(RegisterController)
router.route("/recover-password").post(AuthController.recoverPassword)
router.route("/forgot-password").post(AuthController.forgotPassword)
router.route("/reset-password").post(AuthController.resetPassword)




module.exports = router