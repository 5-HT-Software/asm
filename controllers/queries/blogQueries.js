const {queryBuilder} = require("../../helpers/queryHelpers")

//args{_id}
const blogGetOneQuery = (args) => {
    const fields = ["_id", "title", "content", "publish", "tags", "createdAt", "updatedAt"]
    const query = {
        query: {
            blogGetOne: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

const blogGetAllQuery = () => {
    const fields = ["_id", "title", "content", "publish", "tags", "createdAt", "updatedAt"]
    const query = {
        query: {
            blogGetAll: {
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{name,content,tags}
const blogCreateQuery = (args) => {
    const fields = ["_id", "title", "content", "publish", "tags", "createdAt", "updatedAt"]
    const query = {
        mutation: {
            blogCreate: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{_id,name,content,tags,publish}
const blogUpdateQuery = (args) => {
    const fields = ["_id", "title", "content", "publish", "tags", "createdAt", "updatedAt"]
    const query = {
        mutation: {
            blogUpdate: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{_id}
const blogDeleteQuery = (args) => {
    const fields = ["_id", "title", "content", "publish", "tags", "createdAt", "updatedAt"]
    const query = {
        mutation: {
            blogDelete: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{tag}
const blogsPageQuery = (args) => {
    const fields = [
        {"blogs": ["_id", "title", "content", "publish", "tags", "createdAt", "updatedAt"]},
        {"allTags": ["tagName", "count"]}, "blogsCount"
    ]
    const query = {
        query: {
            blogsPage: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

//args{_id}
const blogPageQuery = (args) => {
    const fields = [
        {"blog": ["_id", "title", "content", "publish", "tags", "createdAt", "updatedAt"]},
        {"randomBlog": ["_id", "title"]},
        {"allTags": ["tagName", "count"]}, "blogsCount"]
    const query = {
        query: {
            blogPage: {
                args,
                fields
            }
        }
    }
    return queryBuilder(query)
}

module.exports = {blogGetOneQuery, blogGetAllQuery, blogCreateQuery, blogUpdateQuery, blogDeleteQuery, blogsPageQuery, blogPageQuery}