const {CalismaTablosuType} = require("../types")
const {CalismaTablosu} = require("../../models")
const {GraphQLString, GraphQLID, GraphQLList, GraphQLInt} = require("graphql")

const calismaTablosuCreate = {
    type: CalismaTablosuType,
    description: "Create a Calisma Tablosu Item",
    args: {
        url: {type: GraphQLString},
    },
    async resolve(parent, args) {
        let page_item = new CalismaTablosu(args)
        if (!page_item) throw new Error("Bir hata oluştu")
        return page_item.save()
    }
}

const calismaTablosuDelete = {
    type: CalismaTablosuType,
    description: "Delete a Calisma Tablosu Item",
    args: {
        _id: {type: GraphQLID},
    },
    async resolve(parent, args) {
        let tablo = CalismaTablosu.findByIdAndDelete(args._id)
        if (!tablo) throw new Error("Bir hata oluştu")
        return tablo
    }
}

module.exports = {calismaTablosuCreate, calismaTablosuDelete}