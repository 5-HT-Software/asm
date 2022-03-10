const {GraphQLList, GraphQLID, GraphQLString} = require("graphql")
const {BlogType, BlogsPageType, BlogPageType} = require("../types")
const {Blog} = require("../../models")


const blogGetOne = {
  type: BlogType,
  description: "Retrieve one item on Hizmet Standartlari Tablosu",
  args: {_id: {type: GraphQLID}},
  resolve(parent, args) {
    return Blog.findById(args._id)
  }
}

const blogGetAll = {
  type: new GraphQLList(BlogType),
  description: "Retrieves items on Hizmet Standartlari Tablosu",
  resolve(parent, args) {
    return Blog.find()
  }
}


const blogsPage = {
  type: BlogsPageType,
  description: "Retrieves items on Hizmet Standartlari Tablosu",
  args: {tags: {type: GraphQLString}},
  resolve(parent, args) {
    let match = {}
    match.publish = true
    if (args.tags) match.tags = args.tags
    return {blogs: Blog.find(match)}
  }
}

const blogPage = {
  type: BlogPageType,
  description: "Retrieves items on Hizmet Standartlari Tablosu",
  args: {_id: {type: GraphQLID}},
  async resolve(parent, args) {
    let match = {}
    match._id = args._id
    match.publish = true
    const blog = await Blog.findOne(match)
    if (!blog) throw new Error("Bir hata oluştu")
    return {blog}
  }
}

module.exports = {blogGetOne, blogGetAll, blogsPage, blogPage}
