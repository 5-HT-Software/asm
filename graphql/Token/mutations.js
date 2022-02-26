const {TokenType} = require("../types")
const {Token} = require("../../models")
const {GraphQLString, GraphQLID, GraphQLList, GraphQLInt} = require("graphql")
const {v4: uuidv4} = require('uuid')

const tokenCreate = {
    type: TokenType,
    description: "Creates a new Token",
    args: {
        target_id: {type: GraphQLID},
        type: {type: GraphQLString},
    },
    async resolve(parent, args) {
        const isExist = await Token.findOneAndDelete(args)
        const token = new Token({
            target_id: args.target_id,
            token: uuidv4(),
            type: args.type
        })
        if (!token) throw new Error("Token couldn't create")
        return token.save()
    }
}

const tokenDelete = {
    type: TokenType,
    description: "Removes a Token",
    args: {
        _id: {type: GraphQLID}
    },
    async resolve(parent, args) {
        let token = Token.findOneAndDelete(args)
        if (!token) throw new Error("Token couldn't remove")
        return token
    }
}

module.exports = {
    tokenCreate,
    tokenDelete,
}