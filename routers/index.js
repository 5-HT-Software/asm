const express = require("express")
const router = express.Router()
//*** graphql ***//
const {
    graphqlHTTP
} = require("express-graphql")
const schema = require("../graphql/schema")

const IndexController = require("../controllers/index")
const {siteInfo} = require("../controllers/middlewares")


//*** graphql ***//


router.use(siteInfo)

router.use("/", require("./auth"))
router.route("/").get(IndexController.indexPage)
router.route("/kadromuz").get(IndexController.kadromuzPage)
router.route("/hizmetlerimiz").get(IndexController.hizmetlerimizPage)
router.route("/calisma-tablosu").get(IndexController.calismaTablosuPage)
router.route("/hizmet-standartlari-tablosu").get(IndexController.hizmetStandartlariTablosuPage)
router.route("/faydali-bilgiler/:name/:_id").get(IndexController.faydaliBilgiPage)
router.route("/faydali-bilgiler").get(IndexController.faydaliBilgilerPage)
router.route("/iletisim").get(IndexController.iletisimPage)








//setting posts



router.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
)
module.exports = router