const {graphql} = require("graphql")
const schema = require("../../../graphql/schema")

const {getAllUsersQuery, getOneUserByIdQuery, userCreateQuery, userUpdateQuery, userDeleteQuery} = require("../../queries/userqueries")
const {tokenCreateQuery} = require("../../queries/tokenqueries")
const {sendNewPasswordMail} = require("../../mail")

const usersPage = async (req, res) => {
    const result = await graphql(schema, getAllUsersQuery())
    if (!result.errors) {
        res.render("pages/admin/user/users", {layout: "admin", users: result.data.users})
    }
    else {
        console.log(result.errors)
        req.flash("error", "Bir hata oluştu!")
        res.render("pages/admin/user/users", {layout: "admin", users: null})
    }
}

const userUpdatePage = async (req, res) => {
    if (req.params.userId) {
        const result = await graphql(schema, getOneUserByIdQuery({_id: req.params.userId}))
        if (!result.errors) {
            res.render("pages/admin/user/userUpdate", {layout: "admin", user: result.data.user})
        }
        else {
            console.log(result.errors)
            req.flash("error", "Bir hata oluştu!")
            res.redirect("/admin/users")
        }
    }
    else {
        res.redirect("/admin/users")
    }
}


const userCreatePage = async (req, res) => {
    res.render("pages/admin/user/userCreate", {layout: "admin"})
}

const userCreate = async (req, res) => {
    const result = await graphql(schema, userCreateQuery(req.body))
    if (!result.errors) {
        let newUser = result.data.userCreate
        let token = await graphql(schema, tokenCreateQuery({target_id: newUser._id, type: "newPassword"}))
        sendNewPasswordMail(token.data.tokenCreate.token, newUser.email)
        req.flash("success", "User added successfully.")
        res.redirect("/admin/users")
    }
    else {
        console.log(result.errors)
        res.render("pages/admin/user/userCreate", {layout: "admin", user: req.body, flashMessages: {error: result.errors[0].message}})
    }
}

const userUpdate = async (req, res) => {
    if (req.params.userId) {
        let data = req.body
        data._id = req.params.userId
        const result = await graphql(schema, userUpdateQuery(data))
        if (!result.errors) {
            req.flash("success", "User updated successfully.")
            res.redirect("/admin/user/" + req.params.userId + "/update")
        }
        else {
            console.log(result.errors)
            req.flash("error", result.errors[0].message)
            res.redirect("/admin/user/" + req.params.userId + "/update")
        }
    }
    else {
        req.flash("error", "Url error")
        res.redirect("/admin/users")
    }

}

const userDelete = async (req, res) => {
    console.log("req.params.userId", req.params.userId)

    if (req.params.userId) {
        const result = await graphql(schema, userDeleteQuery({_id: req.params.userId}))
        if (!result.errors) {
            req.flash("success", "User updated successfully.")
        }
        else {
            console.log(result.errors)
            req.flash("error", result.errors[0].message)
        }
    }
    else {
        req.flash("error", "Url error")
    }

    res.redirect("/admin/users")
}

module.exports = {usersPage, userUpdatePage, userCreatePage, userCreate, userUpdate, userDelete}