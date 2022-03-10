const {graphql} = require("graphql")
const schema = require("../../graphql/schema")

const {siteQuery, siteUpdateQuery} = require("../queries/siteQueries")

const settingsPage = async (req, res) => {
    const siteResult = await graphql(schema, siteQuery())
    if (!siteResult.errors) {
        res.render("pages/admin/settings", {layout: "admin", site: siteResult.data.site})
    } else res.render("pages/admin/settings", {layout: "admin", flashMessages: {error: "Bir hata oluştu!"}})
}

const siteUpdate = async (req, res) => {
    const siteResult = await graphql(schema, siteUpdateQuery(req.body))
    if (!siteResult.errors) {
        req.flash("success", "Bilgiler başarıyla güncellendi.")
    }
    else {
        console.log(siteResult.errors)
        req.flash("error", siteResult.errors[0].message)
    }
    res.redirect("/admin/settings")
}

module.exports = {settingsPage, siteUpdate}
