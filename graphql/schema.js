// Import required stuff from graphql
const {
    GraphQLSchema,
    GraphQLObjectType
} = require("graphql")



// Import queries
const {user, users, userByEmail} = require("./User/queries")
const {token, tokens} = require("./Token/queries")
const {getPageItems} = require("./Pages/queries")
const {site} = require("./Site/queries")
const {getLastCalismaTablosu, getAllCalismaTablosu} = require("./CalismaTablosu/queries")
const {indexSliders} = require("./IndexSlider/queries")
const {getOneHizmetStandartlari, getAllHizmetStandartlari} = require("./HizmetStandartlari/queries")
const {iletisim} = require("./Iletisim/queries")
const {blogGetOne, blogGetAll, blogsPage, blogPage} = require("./Blog/queries")

// Import mutations
const {
    userCreate,
    userUpdate,
    userDelete,
    userUpdatePassword
} = require("./User/mutations")
const {tokenCreate, tokenDelete} = require("./Token/mutations")
const {setPageItem} = require("./Pages/mutations")
const {siteUpdate} = require("./Site/mutations")
const {calismaTablosuCreate, calismaTablosuDelete} = require("./CalismaTablosu/mutations")
const {indexSliderCreate, indexSliderUpdate, indexSliderDelete} = require("./IndexSlider/mutations")
const {hizmetStandartlariCreate, hizmetStandartlariUpdate, hizmetStandartlariDelete} = require("./HizmetStandartlari/mutations")
const {iletisimCreateOrUpdate, iletisimCreateOther, iletisimUpdateOther, iletisimDeleteOther} = require("./Iletisim/mutations")
const {blogCreate, blogUpdate, blogDelete} = require("./Blog/mutations")

// Define QueryType
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: {
        user, users, userByEmail,
        token, tokens,
        getPageItems,
        site,
        getLastCalismaTablosu, getAllCalismaTablosu,
        indexSliders,
        getOneHizmetStandartlari, getAllHizmetStandartlari,
        iletisim,
        blogGetOne, blogGetAll, blogsPage, blogPage
    }
})

// Define MutationType
const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: {
        userCreate, userUpdate, userDelete, userUpdatePassword,
        tokenCreate, tokenDelete,
        setPageItem,
        siteUpdate,
        calismaTablosuCreate, calismaTablosuDelete,
        indexSliderCreate, indexSliderUpdate, indexSliderDelete,
        hizmetStandartlariCreate, hizmetStandartlariUpdate, hizmetStandartlariDelete,
        iletisimCreateOrUpdate, iletisimCreateOther, iletisimUpdateOther, iletisimDeleteOther,
        blogCreate, blogUpdate, blogDelete
    }
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})