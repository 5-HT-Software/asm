const {GraphQLList, GraphQLID, GraphQLInputObjectType, GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLFloat} = require("graphql")
const {UserType} = require("../types")
const {User} = require("../../models")


const user = {
  type: UserType,
  description: "Retrieves one user",
  args: {_id: {type: GraphQLID}},
  resolve(parent, args) {
    return User.findById(args._id)
  }
}

const userByEmail = {
  type: UserType,
  description: "Retrieves one user",
  args: {email: {type: GraphQLString}},
  resolve(parent, args) {
    return User.findOne(args)
  }
}

const users = {
  type: new GraphQLList(UserType),
  description: "Retrieves all users",
  resolve(parent, args) {
    return User.find({})
  }
}

module.exports = {user, users, userByEmail}
