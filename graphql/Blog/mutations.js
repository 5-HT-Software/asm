const {BlogType} = require("../types")
const {Blog} = require("../../models")
const {GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean} = require("graphql")

const blogCreate = {
    type: BlogType,
    description: "Create a blog",
    args: {
        title: {type: GraphQLString},
        content: {type: GraphQLString},
        publish: {type: GraphQLBoolean},
        tags: {type: new GraphQLList(GraphQLString)}
    },
    async resolve(parent, args) {
        let blog = new Blog(args)
        if (!blog) throw new Error("Bir hata oluştu")
        return blog.save()
    }
}

const blogUpdate = {
    type: BlogType,
    description: "Update a blog",
    args: {
        _id: {type: GraphQLID},
        title: {type: GraphQLString},
        content: {type: GraphQLString},
        publish: {type: GraphQLBoolean},
        tags: {type: new GraphQLList(GraphQLString)}
    },
    async resolve(parent, args) {
        const blog = await Blog.findByIdAndUpdate(args._id, args, {omitUndefined: true, new: true})
        if (!blog) throw new Error("Bir hata oluştu")
        return blog.save()
    }
}

const blogDelete = {
    type: BlogType,
    description: "Delete a blog",
    args: {
        _id: {type: GraphQLID},
    },
    async resolve(parent, args) {
        let blog = Blog.findByIdAndDelete(args._id)
        if (!blog) throw new Error("Bir hata oluştu")
        return blog
    }
}

module.exports = {blogCreate, blogUpdate, blogDelete}