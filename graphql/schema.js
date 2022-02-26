// Import required stuff from graphql
const {
    GraphQLSchema,
    GraphQLObjectType
} = require("graphql")



// Import queries
const {user, users, userByEmail} = require("./User/queries")
const {token, tokens} = require("./Token/queries")
// Import mutations
const {
    userCreate,
    userUpdate,
    userDelete,
    userUpdatePassword
} = require("./User/mutations")

const {tokenCreate, tokenDelete} = require("./Token/mutations")

// Define QueryType
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: {
        user, users, userByEmail,
        token, tokens
    }
})

// Define MutationType
const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: {
        userCreate, userUpdate, userDelete, userUpdatePassword,
        tokenCreate, tokenDelete
    }
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})