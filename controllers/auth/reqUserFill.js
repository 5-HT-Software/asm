const {graphql} = require("graphql")
const schema = require("../../graphql/schema")
const {queryBuilder} = require("../../helpers/queryHelpers")

module.exports = async (userId) => {
  let user
  const fields = ["_id", "username", "name", "surname", "email", "avatar", "authority"]
  const args = {_id: userId.toString()}
  const query = {
    query: {
      user: {
        args,
        fields
      }
    }
  }
  const result = await graphql(schema, queryBuilder(query))
  if (!result.errors) user = result.data.user
  else console.log(result.errors)
  return user
}