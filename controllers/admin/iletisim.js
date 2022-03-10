const {graphql} = require("graphql")
const schema = require("../../graphql/schema")


const {iletisimQuery,
    iletisimCreateOrUpdateQuery,
    iletisimCreateOtherQuery,
    iletisimUpdateOtherQuery,
    iletisimDeleteOtherQuery} = require("../queries/iletisimQueries")


const iletisimPage = async (req, res) => {
    const result = await graphql(schema, iletisimQuery())
    if (!result.errors) {
        res.render("pages/admin/iletisim", {layout: "admin", iletisim: result.data.iletisim})
    } else res.render("pages/admin/iletisim", {layout: "admin", flashMessages: {error: "Bir hata oluştu!"}})
}

const iletisimCreateOrUpdate = async (req, res) => {
    let args = req.body
    if (req.params._id != "false") {
        args._id = req.params._id
    }
    const result = await graphql(schema, iletisimCreateOrUpdateQuery(args))
    if (!result.errors) {
        req.flash("success", "İletişim bilgileri başarıyla güncellendi.")
    } else req.flash("error", result.errors[0].message)
    res.redirect("/admin/iletisim")
}


const iletisimCreateOther = async (req, res) => {
    const result = await graphql(schema, iletisimCreateOtherQuery(req.body))
    if (!result.errors) {
        req.flash("success", "İletişim bilgisi başarıyla eklendi.")
    } else req.flash("error", result.errors[0].message)
    res.redirect("/admin/iletisim")
}

const iletisimUpdateOther = async (req, res) => {
    let args = req.body
    args._id = req.params._id

    const result = await graphql(schema, iletisimUpdateOtherQuery(args))
    if (!result.errors) {
        req.flash("success", "İletişim bilgisi başarıyla güncellendi.")
    } else req.flash("error", result.errors[0].message)
    res.redirect("/admin/iletisim")
}

const iletisimDeleteOther = async (req, res) => {
    const result = await graphql(schema, iletisimDeleteOtherQuery(req.params))
    if (!result.errors) {
        req.flash("success", "İletişim bilgisi başarıyla silindi.")
    } else req.flash("error", result.errors[0].message)
    res.redirect("/admin/iletisim")
}

module.exports = {iletisimPage, iletisimCreateOrUpdate, iletisimCreateOther, iletisimUpdateOther, iletisimDeleteOther}