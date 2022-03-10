const {queryBuilder} = require("../../helpers/queryHelpers")

const siteQuery = () => {
    const fields = ["_id", "site_name", "site_long_name", "address", "phone"]
    const query = {
        query: {
            site: {
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{site_name}
const siteUpdateQuery = (args) => {
    const fields = ["_id", "site_name", "site_long_name", "address", "phone"]
    const query = {
        mutation: {
            siteUpdate: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}
module.exports = {siteQuery, siteUpdateQuery}