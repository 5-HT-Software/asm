const {queryBuilder} = require("../../helpers/queryHelpers")

// args{_id}
const getOneHizmetStandartlariQuery = (args) => {
    const fields = ["_id", "name", "order", "documents", "duration"]
    const query = {
        query: {
            getOneHizmetStandartlari: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

const getAllHizmetStandartlariQuery = () => {
    const fields = ["_id", "name", "order", "documents", "duration"]
    const query = {
        query: {
            getAllHizmetStandartlari: {
                fields
            }
        }
    }
    return queryBuilder(query)
}

// args{name,order,documents,duration}
const hizmetStandartlariCreateQuery = (args) => {
    const fields = ["_id", "name", "order", "documents", "duration"]
    const query = {
        mutation: {
            hizmetStandartlariCreate: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

// args{_id,name,order,documents,duration}
const hizmetStandartlariUpdateQuery = (args) => {
    const fields = ["_id", "name", "order", "documents", "duration"]
    const query = {
        mutation: {
            hizmetStandartlariUpdate: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

// args{_id}
const hizmetStandartlariDeleteQuery = (args) => {
    const fields = ["_id", "name", "order", "documents", "duration"]
    const query = {
        mutation: {
            hizmetStandartlariDelete: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

module.exports = {
    getOneHizmetStandartlariQuery,
    getAllHizmetStandartlariQuery,
    hizmetStandartlariCreateQuery,
    hizmetStandartlariUpdateQuery,
    hizmetStandartlariDeleteQuery
}