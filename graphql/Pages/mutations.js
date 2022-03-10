const {PagesType} = require("../types")
const {Pages} = require("../../models")
const {GraphQLString, GraphQLID, GraphQLList, GraphQLInt} = require("graphql")

const setPageItem = {
    type: PagesType,
    description: "Creates or update a Page Item",
    args: {
        page_name: {type: GraphQLString},
        area_name: {type: GraphQLString},
        data: {type: GraphQLString},
    },
    async resolve(parent, args) {
        console.log("girdi")
        const {page_name, area_name, data} = args
        let page_item = await Pages.findOne({page_name, area_name})
        console.log(page_item)
        if (page_item) {
            page_item.data = data
        }
        else {
            page_item = new Pages(args)
        }
        //if (!page_item) throw new Error("Bir hata oluştu")
        return page_item.save()
    }
}

module.exports = {
    setPageItem
}