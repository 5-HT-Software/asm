const {graphql} = require("graphql")
const schema = require("../graphql/schema")

const pagesItems = require("../helpers/pageItems")
const {getLastCalismaTablosuQuery} = require("./queries/calismaTablosuQueries")
const {indexSlidersGetAllQuery} = require("./queries/indexSliderQueries")
const {getAllHizmetStandartlariQuery} = require("./queries/hizmetStandartlariQueries")
const {iletisimQuery} = require("./queries/iletisimQueries")

const {blogsPageQuery, blogPageQuery} = require("./queries/blogQueries")

const indexPage = async (req, res) => {
    let pageItems = await pagesItems.getPageItems("index")
    let result = await graphql(schema, indexSlidersGetAllQuery({publish: true}))
    if (!result.errors) {
        res.render("pages/index", {title: "Anasayfa", pageItems, indexSliders: result.data.indexSliders})
    } else res.render("pages/index", {title: "Anasayfa", pageItems, indexSliderError: "Bir hata oluştu!"})
}

const kadromuzPage = async (req, res) => {
    let pageItems = await pagesItems.getPageItems("kadromuz")
    res.render("pages/kadromuz", {title: "Kadromuz", pageItems})
}

const hizmetlerimizPage = async (req, res) => {
    let pageItems = await pagesItems.getPageItems("hizmetlerimiz")
    res.render("pages/hizmetlerimiz", {title: "Hizmetlerimiz", pageItems})
}

const calismaTablosuPage = async (req, res) => {
    const result = await graphql(schema, getLastCalismaTablosuQuery())
    if (!result.errors) {
        res.render("pages/calisma-tablosu", {title: "Çalışma Tablosu", tablo: result.data.getLastCalismaTablosu})
    }
    else {
        console.log(result.errors)
        req.flash("error", "Çalışma tablosu yüklenemedi. Lütfen daha sonra tekrar deneyiniz.")
        res.render("pages/calisma-tablosu", {title: "Çalışma Tablosu"})
    }
}

const hizmetStandartlariTablosuPage = async (req, res) => {
    const result = await graphql(schema, getAllHizmetStandartlariQuery())
    if (!result.errors) {
        res.render("pages/hizmet-standartlari-tablosu", {title: "Hizmet Standartları Tablosu", hizmetStandartlari: result.data.getAllHizmetStandartlari})
    }
    else {
        console.log(result.errors)
        req.flash("error", "Çalışma tablosu yüklenemedi. Lütfen daha sonra tekrar deneyiniz.")
        res.render("pages/hizmet-standartlari-tablosu", {title: "Hizmet Standartları Tablosu"})
    }
}

const faydaliBilgilerPage = async (req, res) => {
    let args = {}
    args.tags = req.query.tag ? req.query.tag : null
    const result = await graphql(schema, blogsPageQuery(args))
    if (!result.errors) {
        res.render("pages/faydali-bilgiler", {...result.data.blogsPage, ...{title: "Faydalı Bilgiler"}})
    } else {
        console.log(result.errors)
        res.render("pages/faydali-bilgiler", {title: "Faydalı Bilgiler", flashMessages: {error: "Bir hata oluştu!"}})
    }
}

const faydaliBilgiPage = async (req, res) => {
    const result = await graphql(schema, blogPageQuery({_id: req.params._id}))
    if (!result.errors) {
        res.render("pages/faydali-bilgi", {...result.data.blogPage, ...{title: result.data.blogPage.blog.title}})
    } else {
        console.log(result.errors)
        res.render("pages/faydali-bilgi", {flashMessages: {error: "Bir hata oluştu!"}})
    }
}


const iletisimPage = async (req, res) => {
    const result = await graphql(schema, iletisimQuery())
    if (!result.errors) {
        res.render("pages/iletisim", {iletisim: result.data.iletisim, title: "İletişim"})
    } else res.render("pages/iletisim", {flashMessages: {error: "Bir hata oluştu!"}, title: "İletişim"})
}

module.exports = {
    indexPage,
    kadromuzPage,
    hizmetlerimizPage,
    calismaTablosuPage,
    hizmetStandartlariTablosuPage,
    faydaliBilgilerPage,
    faydaliBilgiPage,
    iletisimPage
}