const {GraphQLString, GraphQLList} = require("graphql")
const {CalismaTablosuType} = require("../types")
const {CalismaTablosu} = require("../../models")


const getLastCalismaTablosu = {
  type: CalismaTablosuType,
  description: "Retrieve last item on Calisma Tablosu",
  args: {page_name: {type: GraphQLString}},
  resolve(parent, args) {
    return CalismaTablosu.findOne().sort("-createdAt")
  }
}

const getAllCalismaTablosu = {
  type: new GraphQLList(CalismaTablosuType),
  description: "Retrieves items on Calisma Tablosu",
  resolve(parent, args) {
    return CalismaTablosu.find()
  }
}

module.exports = {getLastCalismaTablosu, getAllCalismaTablosu}
