const bcrypt = require("bcryptjs")
const {UserType} = require("../types")
const {User} = require("../../models")
const {GraphQLString, GraphQLID, GraphQLList, GraphQLInt} = require("graphql")

const userCreate = {
    type: UserType,
    description: "Register a new User",
    args: {
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        name: {type: GraphQLString},
        surname: {type: GraphQLString},
        authority: {type: GraphQLString},
    },
    async resolve(parent, args) {
        const {username, email, name, surname, authority} = args
        let {password} = args
        let checkUser = await User.findOne({"$or": [{email}, {username}]})
        if (checkUser && checkUser.username == username) throw new Error("Username is not available!")
        if (checkUser && checkUser.email == email) throw new Error("Email address is not available")

        if (password) {
            const salt = await bcrypt.genSalt(10)
            password = await bcrypt.hash(password, salt)
        }

        const user = new User({username, email, password, name, surname, authority})
        return user.save()
    }
}
const userUpdate = {
    type: UserType,
    description: "Update a User",
    args: {
        _id: {type: GraphQLString},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        name: {type: GraphQLString},
        surname: {type: GraphQLString},
        avatar: {type: GraphQLString},
        authority: {type: GraphQLString},
    },
    resolve: async function (parent, args) {
        const {_id, email, username} = args
        console.log(args)
        let checkUser = await User.findOne({_id: {"$ne": _id}, "$or": [{email}, {username}]})
        if (checkUser && checkUser.username == username) throw new Error("Username is not available!")
        if (checkUser && checkUser.email == email) throw new Error("Email address is not available!")
        const update = await User.findByIdAndUpdate(_id, args, {omitUndefined: true, new: true})
        if (!update) throw new Error("User information update is failed.")
        return update
    }
}
const userDelete = {
    type: UserType,
    description: "Removes a User",
    args: {
        _id: {type: GraphQLID}
    },
    async resolve(parent, args) {
        const {_id} = args

        const user = await User.findById(_id)
        if (user.authority == "superAdmin") {
            const superAdmins = await User.find({authority: "superAdmin"})
            if (superAdmins.length == 1) throw new Error("You can not delete last super admin client")
        }
        const del = await User.findByIdAndRemove(_id)
        if (!del) throw new Error("User not found")
        return del
    }
}

const userUpdatePassword = {
    type: UserType,
    description: "Update a User Password",
    args: {
        _id: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    resolve: async function (parent, args) {
        const {_id, password} = args
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const update = await User.findByIdAndUpdate(_id, {password: hash}, {omitUndefined: true})
        if (!update) throw new Error("User password update is failed.")
        return update
    }
}

module.exports = {
    userCreate,
    userUpdate,
    userDelete,
    userUpdatePassword
}