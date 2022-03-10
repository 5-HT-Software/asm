const {SiteType} = require("../types")
const {Site} = require("../../models")
const {GraphQLString, GraphQLID, GraphQLList, GraphQLInt} = require("graphql")

const siteUpdate = {
    type: SiteType,
    description: "Update Site info",
    args: {
        _id: {type: GraphQLID},
        site_name: {type: GraphQLString},
        site_long_name: {type: GraphQLString},
    },
    async resolve(parent, args) {
        let site = Site.findOneAndUpdate({}, args, {omitUndefined: true, new: true})
        if (!site) throw new Error("Bir hata oluştu")
        return site
    }
}

module.exports = {
    siteUpdate
}