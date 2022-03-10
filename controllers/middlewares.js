const {graphql} = require("graphql")
const schema = require("../graphql/schema")

const {siteQuery} = require("./queries/siteQueries")


const siteInfo = async (req, res, next) => {
    const siteResult = await graphql(schema, siteQuery())
    console.log("siteResult", siteResult)
    if (!siteResult.errors) res.locals.siteInfo = siteResult.data.site
    next()
}

module.exports = {siteInfo}
