const {queryBuilder} = require("../../helpers/queryHelpers")

const iletisimQuery = () => {
    const fields = ["_id", "map", "mainAddress", "mainPhone", {"others": ["_id", "name", "address", "phone"]}]
    const query = {
        query: {
            iletisim: {
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{_id,map,mainAddress,mainPhone}
const iletisimCreateOrUpdateQuery = (args) => {
    const fields = ["_id", "map", "mainAddress", "mainPhone", {"others": ["_id", "name", "address", "phone"]}]
    const query = {
        mutation: {
            iletisimCreateOrUpdate: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{name,address,phone}
const iletisimCreateOtherQuery = (args) => {
    const fields = ["_id", "map", "mainAddress", "mainPhone", {"others": ["_id", "name", "address", "phone"]}]
    const query = {
        mutation: {
            iletisimCreateOther: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{_id,name,address,phone}
const iletisimUpdateOtherQuery = (args) => {
    const fields = ["_id", "map", "mainAddress", "mainPhone", {"others": ["_id", "name", "address", "phone"]}]
    const query = {
        mutation: {
            iletisimUpdateOther: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{_id}
const iletisimDeleteOtherQuery = (args) => {
    const fields = ["_id", "map", "mainAddress", "mainPhone", {"others": ["_id", "name", "address", "phone"]}]
    const query = {
        mutation: {
            iletisimDeleteOther: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}


module.exports = {
    iletisimQuery,
    iletisimCreateOrUpdateQuery,
    iletisimCreateOtherQuery,
    iletisimUpdateOtherQuery,
    iletisimDeleteOtherQuery
}