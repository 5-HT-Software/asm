const {GraphQLString, GraphQLList} = require("graphql")
const {PagesType} = require("../types")
const {Pages} = require("../../models")


const getPageItems = {
  type: new GraphQLList(PagesType),
  description: "Retrieves items on page",
  args: {page_name: {type: GraphQLString}},
  resolve(parent, args) {
    return Pages.find(args)
  }
}


module.exports = {getPageItems}
