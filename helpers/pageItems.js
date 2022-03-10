const {graphql} = require("graphql")
const schema = require("../graphql/schema")
const {queryBuilder} = require("./queryHelpers")

const getPageItems = async (pageName) => {
    const fields = ["page_name", "area_name", "data"]
    const args = {page_name: pageName}
    const query = {
        query: {
            getPageItems: {
                args,
                fields
            }
        }
    }
    const result = await graphql(schema, queryBuilder(query))
    let pages = {}
    result.data.getPageItems.forEach(p => {
        pages[p.area_name] = p.data
    })
    return pages
}

const setPageItem = async (req, res) => {
    const fields = ["page_name", "area_name", "data"]
    const args = {
        page_name: req.params.pageName,
        area_name: req.params.areaName,
        data: req.body.data
    }
    const query = {
        mutation: {
            setPageItem: {
                args,
                fields
            }
        }
    }
    const result = await graphql(schema, queryBuilder(query))
    if (!result.errors) {
        res.send({error: null, data: result.data.setPageItem})
    }
    else {
        console.log(result.errors)
        res.send({error: result.errors[0].message})
    }
}

module.exports = {getPageItems, setPageItem}