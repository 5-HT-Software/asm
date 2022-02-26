const express = require("express")
const router = express.Router()

const {sessionCheck} = require("../../helpers/permission")
const ProfileController = require("../../controllers/admin/profile")
const SettingsController = require("../../controllers/admin/settings")
const DashboardController = require("../../controllers/admin/dashboard")
//Middlewares
router.use(sessionCheck)

//Routes
router.use("/", require("./user"))

router.route("/").get(DashboardController.dashboardPage)

router.route("/profile").get(ProfileController.profilePage)
router.route("/settings").get(SettingsController.settingsPage)

router.route("/profile/update").post(ProfileController.profileUpdate)
router.route("/profile/update-image").post(ProfileController.profileUpdateImage)

module.exports = router