const {queryBuilder} = require("../../helpers/queryHelpers")

const getAllUsersQuery = () => {
    const fields = ["_id", "username", "name", "surname", "email", "avatar", "authority"]
    const query = {
        query: {
            users: {
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{_id}
const getOneUserByIdQuery = (args) => {
    const fields = ["_id", "username", "name", "surname", "email", "avatar", "authority"]
    const query = {
        query: {
            user: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args(username,email,name,surname,authority,password (notNecessary))
const userCreateQuery = (args) => {
    const fields = ["_id", "username", "name", "surname", "email", "avatar", "authority"]
    const query = {
        mutation: {
            userCreate: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args(_id,username,email,name,surname,authority)
const userUpdateQuery = (args) => {
    const fields = ["_id", "username", "name", "surname", "email", "avatar", "authority"]
    const query = {
        mutation: {
            userUpdate: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args(_id,password)
const userUpdatePasswordQuery = (args) => {
    const fields = ["_id", "username", "name", "surname", "email", "avatar", "authority"]
    const query = {
        mutation: {
            userUpdatePassword: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{email}
const getOneUserByEmailQuery = (args) => {
    const fields = ["_id", "username", "name", "surname", "email", "avatar", "authority"]
    const query = {
        query: {
            userByEmail: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{_id}
const userDeleteQuery = (args) => {
    console.log(args)
    const fields = ["_id", "username", "name", "surname", "email", "avatar", "authority"]
    const query = {
        mutation: {
            userDelete: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}


module.exports = {
    getAllUsersQuery,
    getOneUserByIdQuery,
    userCreateQuery,
    userUpdateQuery,
    userUpdatePasswordQuery,
    getOneUserByEmailQuery,
    userDeleteQuery
}