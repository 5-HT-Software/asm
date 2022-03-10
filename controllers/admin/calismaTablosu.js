const {graphql} = require("graphql")
const schema = require("../../graphql/schema")

const {getLastCalismaTablosuQuery, calismaTablosuCreateQuery} = require("../queries/calismaTablosuQueries")
const uploadHelper = require("../../helpers/uploadFile")
const formidable = require("formidable")

const calismaTablosuPage = async (req, res) => {
    const result = await graphql(schema, getLastCalismaTablosuQuery())
    if (!result.errors) {
        res.render("pages/admin/calisma-tablosu", {layout: "admin", data: result.data.getLastCalismaTablosu})
    }
    else {
        console.log(result.errors)
        req.flash("error", "Bir hata oluştu!")
        res.redirect("/admin/calisma-tablosu")
    }
}

const calismaTablosuCreate = async (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
        let avatar = ""
        let catchError = false
        if (files.avatar) {
            avatar = await uploadHelper.uploadFile(files.avatar, "image")
            if (avatar == null) {
                catchError = true
                res.send({error: "Resim yüklenmedi. Lütfen tekrar deneyiniz!"})
            }
        }
        if (!catchError) {
            const result = await graphql(schema, calismaTablosuCreateQuery({url: avatar}))
            if (!result.errors) {
                req.flash("success", "Çalışma tablosu başarıyla güncellendi.")
            }
            else {
                console.log(result.errors)
                req.flash("error", result.errors[0].message)
            }
            res.redirect("/admin/calisma-tablosu")
        }
    })

}

module.exports = {calismaTablosuPage, calismaTablosuCreate}