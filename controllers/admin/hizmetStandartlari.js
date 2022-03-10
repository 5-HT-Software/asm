const {graphql} = require("graphql")
const schema = require("../../graphql/schema")

const {getAllHizmetStandartlariQuery,
    hizmetStandartlariCreateQuery,
    hizmetStandartlariUpdateQuery,
    hizmetStandartlariDeleteQuery} = require("../queries/hizmetStandartlariQueries")

const hizmetPage = async (req, res, next) => {
    const result = await graphql(schema, getAllHizmetStandartlariQuery())
    if (!result.errors) {
        res.render("pages/admin/hizmet-standartlari-tablosu", {layout: "admin", hizmetStandartlari: result.data.getAllHizmetStandartlari})
    } else res.render("pages/admin/indexSlider", {layout: "admin", flashMessages: {error: "Bir hata oluştu!"}})
}

const hizmetStandartlariCreate = async (req, res, next) => {
    let data = req.body
    data.order = parseInt(req.body.order)
    const result = await graphql(schema, hizmetStandartlariCreateQuery(data))
    if (!result.errors) {
        req.flash("success", "Hizmet standartı başarıyla eklendi.")
    } else {
        console.log(result.errors)
        req.flash("error", result.errors[0].message)
    }
    res.redirect("/admin/hizmet-standartlari-tablosu")
}
const hizmetStandartlariUpdate = async (req, res, next) => {
    let data = req.body
    data._id = req.params._id
    data.order = parseInt(req.body.order)
    console.log(data)
    const result = await graphql(schema, hizmetStandartlariUpdateQuery(data))
    if (!result.errors) {
        req.flash("success", "Hizmet standartı başarıyla güncellendi.")
    } else {
        console.log(result.errors)
        req.flash("error", result.errors[0].message)
    }
    res.redirect("/admin/hizmet-standartlari-tablosu")
}
const hizmetStandartlariDelete = async (req, res, next) => {
    const result = await graphql(schema, hizmetStandartlariDeleteQuery(req.params))
    if (!result.errors) {
        req.flash("success", "Hizmet standartı başarıyla silindi.")
    } else {
        console.log(result.errors)
        req.flash("error", result.errors[0].message)
    }
    res.redirect("/admin/hizmet-standartlari-tablosu")
}

module.exports = {hizmetPage, hizmetStandartlariCreate, hizmetStandartlariUpdate, hizmetStandartlariDelete}