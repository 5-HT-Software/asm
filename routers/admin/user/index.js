const express = require("express")
const router = express.Router()

const UserController = require("../../../controllers/admin/user")

//Middlewares

//Routes
router.route("/users").get(UserController.usersPage)
router.route("/user/create").get(UserController.userCreatePage)
router.route("/user/:userId/update").get(UserController.userUpdatePage)


router.route("/user/:userId/update").post(UserController.userUpdate)
router.route("/user/create").post(UserController.userCreate)
router.route("/user/:userId/delete").post(UserController.userDelete)





module.exports = router