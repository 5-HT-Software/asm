const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLObject,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLInt,
    GraphQL,
    GraphQLInputObjectType
} = require("graphql")

const {
    User,
} = require("../models")

const UserType = new GraphQLObjectType({
    name: "UserType",
    description: "User type",
    fields: () => ({
        _id: {type: GraphQLID},
        username: {type: GraphQLString},
        name: {type: GraphQLString},
        surname: {type: GraphQLString},
        email: {type: GraphQLString},
        avatar: {type: GraphQLString},
        authority: {type: GraphQLString},
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    })
})

const TokenType = new GraphQLObjectType({
    name: "TokenType",
    description: "Token type",
    fields: () => ({
        _id: {type: GraphQLID},
        target_id: {type: GraphQLString},
        token: {type: GraphQLString},
        type: {type: GraphQLString},
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    })
})

module.exports = {
    UserType,
    TokenType
}