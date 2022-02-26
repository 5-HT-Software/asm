const {graphql} = require("graphql")
const schema = require("../../graphql/schema")

const {getTokenQuery, tokenDeleteQuery, tokenCreateQuery} = require("../queries/tokenqueries")
const {userUpdatePasswordQuery, getOneUserByEmailQuery} = require("../queries/userqueries")
const {sendNewPasswordMail} = require("../mail")

const loginPage = (req, res) => {
    res.render("pages/auth/login", {layout: "login"})
}

const registerPage = (req, res) => {
    res.render("pages/auth/register", {layout: "login"})
}

const forgotPasswordPage = (req, res) => {
    res.render("pages/auth/forgotPassword", {layout: "login"})
}

const recoverPasswordPage = async (req, res) => {
    let token = await graphql(schema, getTokenQuery({token: req.params.token}))
    if (!token.errors && token.data.token?.type == "newPassword") {
        res.render("pages/auth/recoverPassword", {layout: "login", token: token.data.token})
    }
    else {
        req.flash("error", "Your token is missing")
        res.redirect("/login")
    }
}

const forgotPassword = async (req, res) => {
    const user = await graphql(schema, getOneUserByEmailQuery(req.body))
    if (!user.errors) {
        const userInfo = user.data.userByEmail
        if (userInfo) {
            let token = await graphql(schema, tokenCreateQuery({target_id: userInfo._id, type: "newPassword"}))
            sendNewPasswordMail(token.data.tokenCreate.token, userInfo.email)
            req.flash("success", "Your can check your email")
            res.redirect("/login")
        }
        else {
            res.render("pages/auth/forgotPassword", {layout: "login", flashMessages: {error: "Email not using"}, email: req.body.email})
        }
    }
    else {
        res.render("pages/auth/forgotPassword", {layout: "login", flashMessages: {error: user.errors[0].message}, email: req.body.email})
    }
}

const recoverPassword = async (req, res) => {
    let user = await graphql(schema, userUpdatePasswordQuery({_id: req.body._id, password: req.body.password}))
    if (!user.errors) {
        let token = await graphql(schema, tokenDeleteQuery({_id: req.body.token}))
        if (!token.errors) {
            res.send(true)
        }
        else {
            res.send({error: user.errors[0].message})
        }
    }
    else {
        res.send({error: user.errors[0].message})
    }

}

const resetPassword = async (req, res) => {
    const user = await graphql(schema, getOneUserByEmailQuery(req.body))
    if (!user.errors) {
        const userInfo = user.data.userByEmail
        if (userInfo) {
            let token = await graphql(schema, tokenCreateQuery({target_id: userInfo._id, type: "newPassword"}))
            sendNewPasswordMail(token.data.tokenCreate.token, userInfo.email)
            req.flash("success", "Mail sent to user to create new password")
            res.redirect("/admin/users")
        }
        else {
            req.flash("error", "Email not using")
            res.redirect("/admin/users")
        }
    }
    else {
        req.flash("error", user.errors[0].message)
        res.redirect("/admin/users")
    }
}


module.exports = {loginPage, registerPage, forgotPasswordPage, recoverPasswordPage, forgotPassword, recoverPassword, resetPassword}