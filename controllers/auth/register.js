const {graphql} = require("graphql")
const schema = require("../../graphql/schema")

const {userCreateQuery} = require("../queries/userqueries")

module.exports = async (req, res) => {
    const result = await graphql(schema, userCreateQuery(req.body))
    if (!result.errors) {
        req.flash("success", "Registration successful.")
        res.redirect("/login")
    }
    else {
        console.log(result.errors)
        res.render("pages/auth/register", {layout: "login", user: req.body, flashMessages: {error: result.errors[0].message}})
    }
}
