const express = require("express")
const router = express.Router()

const BlogController = require("../../../controllers/admin/blog")

//Middlewares

//Routes
router.route("/blogs").get(BlogController.blogsPage)
router.route("/blog/create").get(BlogController.blogCreatePage)
router.route("/blog/update/:_id").get(BlogController.blogUpdatePage)

router.route("/blog/create").post(BlogController.blogCreate)
router.route("/blog/update/:_id").post(BlogController.blogUpdate)
router.route("/blog/delete/:_id").post(BlogController.blogDelete)

module.exports = router