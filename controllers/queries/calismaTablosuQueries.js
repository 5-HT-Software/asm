const {queryBuilder} = require("../../helpers/queryHelpers")

const getLastCalismaTablosuQuery = () => {
    const fields = ["_id", "url"]
    const query = {
        query: {
            getLastCalismaTablosu: {
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{url}
const calismaTablosuCreateQuery = (args) => {
    const fields = ["_id", "url"]
    const query = {
        mutation: {
            calismaTablosuCreate: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

module.exports = {
    getLastCalismaTablosuQuery,
    calismaTablosuCreateQuery
}