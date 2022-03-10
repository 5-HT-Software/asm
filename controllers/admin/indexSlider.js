const {graphql} = require("graphql")
const schema = require("../../graphql/schema")
const uploadHelper = require("../../helpers/uploadFile")
const formidable = require("formidable")
const {indexSlidersGetAllQuery, indexSliderAddQuery, indexSliderEditQuery, indexSliderDeleteQuery} = require("../queries/indexSliderQueries")

const indexSliderPage = async (req, res, next) => {
    const result = await graphql(schema, indexSlidersGetAllQuery())
    if (!result.errors) {
        res.render("pages/admin/indexSlider", {layout: "admin", indexSliders: result.data.indexSliders})
    } else res.render("pages/admin/indexSlider", {layout: "admin", flashMessages: {error: "Bir hata oluştu!"}})
}

const indexSliderAdd = async (req, res, next) => {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
        let url = ""
        let catchError = false
        if (files.avatar) {
            url = await uploadHelper.uploadFile(files.avatar, "image")
            if (url == null) {
                catchError = true
                res.send({error: "Görsel yüklenemedi. Lütfen tekrar deneyiniz!"})
            }
        }
        else {
            res.send({error: "Görsel yüklemeniz gerekiyor."})
        }
        if (!catchError) {
            let args = {
                url,
                order: parseInt(fields.order)
            }
            const result = await graphql(schema, indexSliderAddQuery(args))
            if (!result.errors) {
                req.flash("success", "Slider başarıyla eklendi.")
            } else req.flash("error", result.errors[0].message)
            res.redirect("/admin/indexSlider")

        }
    })
}

const indexSliderPublish = async (req, res, next) => {
    const result = await graphql(schema, indexSliderEditQuery(req.body))
    if (!result.errors) {
        res.send({error: null, message: "Kayan resim güncellendi."})
    } else res.send({error: result.errors[0].message})
}

const indexSliderEdit = async (req, res, next) => {
    let data = {}
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
        let url = ""
        let catchError = false
        if (files.avatar.size > 0) {
            url = await uploadHelper.uploadFile(files.avatar, "image")
            if (url == null) {
                catchError = true
                res.send({error: "Görsel yüklenemedi. Lütfen tekrar deneyiniz!"})
            }
            data = {
                url,
                _id: req.params._id,
                order: parseInt(fields.order)
            }
        }
        else {
            data = {
                _id: req.params._id,
                order: parseInt(fields.order)
            }
        }
        if (!catchError) {
            const result = await graphql(schema, indexSliderEditQuery(data))
            if (!result.errors) {
                req.flash("success", "Kayan resim başarıyla güncellendi.")
            } else {
                console.log(result.errors)
                req.flash("error", result.errors[0].message)
            }
            res.redirect("/admin/indexSlider")

        }
    })
}

const indexSliderRemove = async (req, res, next) => {
    const result = await graphql(schema, indexSliderDeleteQuery({_id: req.params._id}))
    console.log(result)
    if (!result.errors) {
        req.flash("success", "Kayan resim başarıyla silindi.");
    } else req.flash("error", result.errors[0].message)
    res.redirect("/admin/indexSlider")
}

module.exports = {
    indexSliderPage, indexSliderAdd, indexSliderPublish, indexSliderEdit, indexSliderRemove
}
