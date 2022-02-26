const {queryBuilder} = require("../../helpers/queryHelpers")

//args{token}
const getTokenQuery = (args) => {
    const fields = ["_id", "target_id", "token", "type"]
    const query = {
        query: {
            token: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{target_id,type}
const tokenCreateQuery = (args) => {
    const fields = ["_id", "target_id", "token", "type"]
    const query = {
        mutation: {
            tokenCreate: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{_id}
const tokenDeleteQuery = (args) => {
    const fields = ["_id", "target_id", "token", "type"]
    const query = {
        mutation: {
            tokenDelete: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

module.exports = {getTokenQuery, tokenCreateQuery, tokenDeleteQuery}