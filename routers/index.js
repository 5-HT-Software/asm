const express = require("express")
const router = express.Router()
//*** graphql ***//
const {
    graphqlHTTP
} = require("express-graphql")
const schema = require("../graphql/schema")
const {
    graphql
} = require("graphql")
//*** graphql ***//


router.use("/", require("./auth"))

router.route("/").get((req, res) => {
    req.flash("success", "Başarıyla toster çalıştı.");
    res.render("pages/index")
})

//setting posts



router.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
)
module.exports = router