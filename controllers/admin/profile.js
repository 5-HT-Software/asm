const {graphql} = require("graphql")
const schema = require("../../graphql/schema")

const {getOneUserByIdQuery} = require("../../controllers/queries/userqueries")
const {userUpdateQuery} = require("../queries/userqueries")
const uploadHelper = require("../../helpers/uploadFile")
const formidable = require("formidable")

const profilePage = async (req, res) => {
    const result = await graphql(schema, getOneUserByIdQuery({_id: req.user._id}))
    if (!result.errors) {
        res.render("pages/admin/profile", {layout: "admin", user: result.data.user})
    }
    else {
        console.log(result.errors)
        req.flash("error", "Bir hata oluştu!")
        res.redirect("/admin")
    }
}

const profileUpdate = async (req, res) => {
    let data = req.body
    data._id = req.user._id
    const result = await graphql(schema, userUpdateQuery(data))
    if (!result.errors) {
        req.flash("success", "User updated successfully.")
    }
    else {
        console.log(result.errors)
        req.flash("error", result.errors[0].message)
    }
    res.redirect("/admin/profile")
}

const profileUpdateImage = async (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
        let avatar = ""
        let catchError = false
        console.log(files.avatar.originalFilename)
        if (files.avatar) {
            avatar = await uploadHelper.uploadFile(files.avatar, "avatar")
            if (avatar == null) {
                catchError = true
                res.send({error: "Profil resmi yüklenmedi. Lütfen tekrar deneyiniz!"})
            }
        }
        if (!catchError) {
            const result = await graphql(schema, userUpdateQuery({_id: req.user._id, avatar}))
            if (!result.errors) {
                req.flash("success", "Profile photo updated successfully.")
            }
            else {
                console.log(result.errors)
                req.flash("error", result.errors[0].message)
            }
            res.redirect("/admin/profile")
        }
    })

}

module.exports = {profilePage, profileUpdate, profileUpdateImage}