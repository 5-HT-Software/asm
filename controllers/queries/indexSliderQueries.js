const {queryBuilder} = require("../../helpers/queryHelpers")
const indexSlidersGetAllQuery = (args) => {
    const fields = ["_id", "url", "order", "publish"
    ]
    const query = {
        query: {
            indexSliders: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

const indexSliderAddQuery = (args) => {
    const fields = ["_id", "url", "order", "publish"
    ]
    const query = {
        mutation: {
            indexSliderCreate: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}


const indexSliderEditQuery = (args) => {
    const fields = ["_id", "url", "order", "publish"
    ]
    const query = {
        mutation: {
            indexSliderUpdate: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

const indexSliderDeleteQuery = (args) => {
    const fields = ["_id", "url", "order", "publish"
    ]
    const query = {
        mutation: {
            indexSliderDelete: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

module.exports = {
    indexSlidersGetAllQuery,
    indexSliderAddQuery,
    indexSliderEditQuery,
    indexSliderDeleteQuery
}