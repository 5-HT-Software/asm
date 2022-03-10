const {graphql} = require("graphql")
const schema = require("../../../graphql/schema")


const {blogGetOneQuery, blogGetAllQuery, blogCreateQuery, blogUpdateQuery, blogDeleteQuery, blogGetAllWoContentQuery} = require("../../queries/blogQueries")


const blogsPage = async (req, res) => {
    const result = await graphql(schema, blogGetAllWoContentQuery())
    if (!result.errors) {
        res.render("pages/admin/blog/blogs", {layout: "admin", blogs: result.data.blogGetAll})
    } else res.render("pages/admin/blog/blogs", {layout: "admin", flashMessages: {error: "Bir hata oluştu!"}})
}

const blogCreatePage = async (req, res) => {
    res.render("pages/admin/blog/create", {layout: "admin"})
}

const blogCreate = async (req, res) => {
    const result = await graphql(schema, blogCreateQuery(req.body))
    if (!result.errors) {
        req.flash("success", "Blog başarıyla eklendi.")
        res.send({error: null})
    } else {
        console.log(result.errors)
        res.send({error: result.errors[0].message})
    }
}

const blogUpdatePage = async (req, res) => {
    const result = await graphql(schema, blogGetOneQuery(req.params))
    if (!result.errors) {
        res.render("pages/admin/blog/update", {layout: "admin", blog: result.data.blogGetOne})
    } else res.render("pages/admin/blog/blogs", {layout: "admin", flashMessages: {error: "Bir hata oluştu!"}})
}

const blogUpdate = async (req, res) => {
    let args = req.body
    args._id = req.params._id
    const result = await graphql(schema, blogUpdateQuery(args))
    if (!result.errors) {
        req.flash("success", "Blog başarıyla güncellendi.")
        res.send({error: null})
    } else {
        console.log(result.errors)
        res.send({error: result.errors[0].message})
    }
}

const blogDelete = async (req, res) => {
    const result = await graphql(schema, blogDeleteQuery(req.params))
    if (!result.errors) {
        req.flash("success", "Blog başarıyla güncellendi.")
    } else {
        console.log(result.errors)
        req.flash("error", result.errors[0].message)
    }
    res.redirect("/admin/blogs")
}

module.exports = {blogsPage, blogCreatePage, blogCreate, blogUpdatePage, blogUpdate, blogDelete}