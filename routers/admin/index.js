const express = require("express")
const router = express.Router()

const {sessionCheck} = require("../../helpers/permission")
const ProfileController = require("../../controllers/admin/profile")
const SettingsController = require("../../controllers/admin/settings")
const DashboardController = require("../../controllers/admin/dashboard")
const CalismaTablosuController = require("../../controllers/admin/calismaTablosu")
const IndexSliderController = require("../../controllers/admin/indexSlider")
const HizmetStandartlariController = require("../../controllers/admin/hizmetStandartlari")
const IletisimController = require("../../controllers/admin/iletisim")
const {siteInfo} = require("../../controllers/middlewares")

const {setPageItem} = require("../../helpers/pageItems")


//Middlewares
router.use(sessionCheck)
router.use(siteInfo)
//Routes
router.use("/", require("./user"))
router.use("/", require("./blog"))



router.route("/").get(DashboardController.dashboardPage)

router.route("/profile").get(ProfileController.profilePage)
router.route("/settings").get(SettingsController.settingsPage)

router.route("/profile/update").post(ProfileController.profileUpdate)
router.route("/profile/update-image").post(ProfileController.profileUpdateImage)

router.route("/setPageItem/:pageName/:areaName").post(setPageItem)

router.route("/calisma-tablosu").get(CalismaTablosuController.calismaTablosuPage)
router.route("/calisma-tablosu/create").post(CalismaTablosuController.calismaTablosuCreate)

router.route("/indexSlider").get(IndexSliderController.indexSliderPage)
router.route("/indexSliderAdd").post(IndexSliderController.indexSliderAdd)
router.route("/indexSliderPublish").post(IndexSliderController.indexSliderPublish)
router.route("/indexSliderEdit/:_id").post(IndexSliderController.indexSliderEdit)
router.route("/indexSliderRemove/:_id").post(IndexSliderController.indexSliderRemove)

router.route("/hizmet-standartlari-tablosu").get(HizmetStandartlariController.hizmetPage)
router.route("/hizmetStandartlari/create").post(HizmetStandartlariController.hizmetStandartlariCreate)
router.route("/hizmetStandartlari/update/:_id").post(HizmetStandartlariController.hizmetStandartlariUpdate)
router.route("/hizmetStandartlari/delete/:_id").post(HizmetStandartlariController.hizmetStandartlariDelete)

router.route("/iletisim").get(IletisimController.iletisimPage)
router.route("/iletisim/update/:_id").post(IletisimController.iletisimCreateOrUpdate)
router.route("/iletisim/createOther").post(IletisimController.iletisimCreateOther)
router.route("/iletisim/updateOther/:_id").post(IletisimController.iletisimUpdateOther)
router.route("/iletisim/deleteOther/:_id").get(IletisimController.iletisimDeleteOther)

router.route("/site/update").post(SettingsController.siteUpdate)

module.exports = router