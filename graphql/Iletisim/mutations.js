const {IletisimType, OtherIletisimType} = require("../types")
const {Iletisim} = require("../../models")
const {GraphQLString, GraphQLID, GraphQLList, GraphQLInt} = require("graphql")

const iletisimCreateOrUpdate = {
    type: IletisimType,
    description: "Create or update iletisim",
    args: {
        _id: {type: GraphQLID},
        map: {type: GraphQLString},
        mainAddress: {type: GraphQLString},
        mainPhone: {type: GraphQLString},
    },
    async resolve(parent, args) {
        let iletisim
        if (args._id) {
            iletisim = await Iletisim.findByIdAndUpdate(args._id, args, {omitUndefined: true, new: true})


        }
        else {
            iletisim = new Iletisim(args)
        }
        if (!iletisim) throw new Error("Bir hata oluştu")
        return iletisim.save()
    }
}


const iletisimCreateOther = {
    type: IletisimType,
    description: "Create an otheriletisim",
    args: {
        name: {type: GraphQLString},
        address: {type: GraphQLString},
        phone: {type: GraphQLString},
    },
    async resolve(parent, args) {
        let iletisim = await Iletisim.findOne()
        iletisim.others.push(args)
        if (!iletisim) throw new Error("Bir hata oluştu")
        return iletisim.save()
    }
}

const iletisimUpdateOther = {
    type: IletisimType,
    description: "Create an otheriletisim",
    args: {
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        address: {type: GraphQLString},
        phone: {type: GraphQLString},
    },
    async resolve(parent, args) {
        let iletisim = await Iletisim.findOneAndUpdate({'others._id': args._id}, {
            '$set': {
                'others.$.name': args.name,
                'others.$.address': args.address,
                'others.$.phone': args.phone
            }
        }, {omitUndefined: true, new: true})
        if (!iletisim) throw new Error("Bir hata oluştu")
        return iletisim
    }
}

const iletisimDeleteOther = {
    type: IletisimType,
    description: "Create an otheriletisim",
    args: {
        _id: {type: GraphQLID}
    },
    async resolve(parent, args) {
        let iletisim = await Iletisim.findOneAndUpdate({'others._id': args._id}, {
            '$pull': {
                others: {_id: args._id},
            }
        }, {omitUndefined: true, new: true})
        if (!iletisim) throw new Error("Bir hata oluştu")
        return iletisim
    }
}

module.exports = {
    iletisimCreateOrUpdate, iletisimCreateOther, iletisimUpdateOther, iletisimDeleteOther
}