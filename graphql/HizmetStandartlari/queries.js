const {GraphQLString, GraphQLList, GraphQLID} = require("graphql")
const {HizmetStandartlariType} = require("../types")
const {HizmetStandartlari} = require("../../models")


const getOneHizmetStandartlari = {
  type: HizmetStandartlariType,
  description: "Retrieve one item on Hizmet Standartlari Tablosu",
  args: {_id: {type: GraphQLID}},
  resolve(parent, args) {
    return HizmetStandartlari.findById(args._id)
  }
}

const getAllHizmetStandartlari = {
  type: new GraphQLList(HizmetStandartlariType),
  description: "Retrieves items on Hizmet Standartlari Tablosu",
  resolve(parent, args) {
    return HizmetStandartlari.find().sort("order")
  }
}

module.exports = {getOneHizmetStandartlari, getAllHizmetStandartlari}
