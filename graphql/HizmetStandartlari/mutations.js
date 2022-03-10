const {HizmetStandartlariType} = require("../types")
const {HizmetStandartlari} = require("../../models")
const {GraphQLString, GraphQLID, GraphQLList, GraphQLInt} = require("graphql")

const hizmetStandartlariCreate = {
    type: HizmetStandartlariType,
    description: "Create a Hizmet Standartlari Tablosu Item",
    args: {
        name: {type: GraphQLString},
        order: {type: GraphQLInt},
        documents: {type: GraphQLString},
        duration: {type: GraphQLString},
    },
    async resolve(parent, args) {
        let hizmet = new HizmetStandartlari(args)
        if (!hizmet) throw new Error("Bir hata oluştu")
        return hizmet.save()
    }
}

const hizmetStandartlariUpdate = {
    type: HizmetStandartlariType,
    description: "Update a Hizmet Standartlari Tablosu Item",
    args: {
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        order: {type: GraphQLInt},
        documents: {type: GraphQLString},
        duration: {type: GraphQLString},
    },
    async resolve(parent, args) {
        const hizmet = await HizmetStandartlari.findByIdAndUpdate(args._id, args, {omitUndefined: true, new: true})
        if (!hizmet) throw new Error("Bir hata oluştu")
        return hizmet.save()
    }
}

const hizmetStandartlariDelete = {
    type: HizmetStandartlariType,
    description: "Delete a Hizmet Standartlari Tablosu",
    args: {
        _id: {type: GraphQLID},
    },
    async resolve(parent, args) {
        let hizmet = HizmetStandartlari.findByIdAndDelete(args._id)
        if (!hizmet) throw new Error("Bir hata oluştu")
        return hizmet
    }
}

module.exports = {hizmetStandartlariCreate, hizmetStandartlariUpdate, hizmetStandartlariDelete}