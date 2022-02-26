const {GraphQLString, GraphQLList} = require("graphql")
const {TokenType} = require("../types")
const {Token} = require("../../models")


const token = {
  type: TokenType,
  description: "Retrieves one token",
  args: {token: {type: GraphQLString}},
  resolve(parent, args) {
    return Token.findOne(args)
  }
}

const tokens = {
  type: GraphQLList(TokenType),
  description: "Retrieves one token",
  resolve(parent, args) {
    return Token.find()
  }
}


module.exports = {token, tokens}
