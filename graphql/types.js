const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLObject,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLInt,
    GraphQL,
    GraphQLInputObjectType
} = require("graphql")

const {
    User, Blog, Iletisim
} = require("../models")

const UserType = new GraphQLObjectType({
    name: "UserType",
    description: "User type",
    fields: () => ({
        _id: {type: GraphQLID},
        username: {type: GraphQLString},
        name: {type: GraphQLString},
        surname: {type: GraphQLString},
        email: {type: GraphQLString},
        avatar: {type: GraphQLString},
        authority: {type: GraphQLString},
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    })
})

const TokenType = new GraphQLObjectType({
    name: "TokenType",
    description: "Token type",
    fields: () => ({
        _id: {type: GraphQLID},
        target_id: {type: GraphQLString},
        token: {type: GraphQLString},
        type: {type: GraphQLString},
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    })
})

const PagesType = new GraphQLObjectType({
    name: "PagesType",
    description: "Pages type",
    fields: () => ({
        _id: {type: GraphQLID},
        page_name: {type: GraphQLString},
        area_name: {type: GraphQLString},
        data: {type: GraphQLString},
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    })
})

const SiteType = new GraphQLObjectType({
    name: "SiteType",
    description: "Site info type",
    fields: () => ({
        _id: {type: GraphQLID},
        site_name: {type: GraphQLString},
        site_long_name: {type: GraphQLString},
        address: {
            type: GraphQLString,
            async resolve(parent, args) {
                let iletisim = await Iletisim.findOne()
                if (!iletisim) return ""
                return iletisim.mainAddress
            }
        },
        phone: {
            type: GraphQLString,
            async resolve(parent, args) {
                let iletisim = await Iletisim.findOne()
                if (!iletisim) return ""
                return iletisim.mainPhone
            }
        },
    })
})

const CalismaTablosuType = new GraphQLObjectType({
    name: "CalismaTablosuType",
    description: "Calisma Tablosu type",
    fields: () => ({
        _id: {type: GraphQLID},
        url: {type: GraphQLString},
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    })
})

const IndexSliderType = new GraphQLObjectType({
    name: "IndexSliderType",
    description: "Index Page Slider type",
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        url: {
            type: GraphQLString
        },
        order: {
            type: GraphQLInt
        },
        publish: {
            type: GraphQLBoolean
        }
    })
})

const HizmetStandartlariType = new GraphQLObjectType({
    name: "HizmetStandartlariType",
    description: "Hizmet Standartlari type",
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        order: {
            type: GraphQLInt
        },
        documents: {
            type: GraphQLString
        },
        duration: {
            type: GraphQLString
        }

    })
})

const OtherIletisimType = new GraphQLObjectType({
    name: "OtherIletisimType",
    description: "Other Iletisim type",
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        }
    })
})

const IletisimType = new GraphQLObjectType({
    name: "IletisimType",
    description: "Iletisim type",
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        map: {
            type: GraphQLString
        },
        mainAddress: {
            type: GraphQLString
        },
        mainPhone: {
            type: GraphQLString
        },
        others: {
            type: new GraphQLList(OtherIletisimType)
        }
    })
})

const BlogType = new GraphQLObjectType({
    name: "BlogType",
    description: "Blog type",
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        },
        publish: {
            type: GraphQLBoolean
        },
        tags: {
            type: new GraphQLList(GraphQLString)
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    })
})


const AllTagsType = new GraphQLObjectType({
    name: "AllTagsType",
    description: "Blog type",
    fields: () => ({
        tagName: {
            type: GraphQLString
        },
        count: {
            type: GraphQLInt
        }
    })
})

const BlogsPageType = new GraphQLObjectType({
    name: "BlogsPageType",
    description: "Faydali bilgiler page type",
    fields: () => ({
        blogs: {
            type: new GraphQLList(BlogType),
        },
        allTags: {
            type: new GraphQLList(AllTagsType),
            async resolve(parent, args) {
                return Blog.aggregate([
                    {$match: {"publish": true}},
                    {$unwind: "$tags"},
                    {
                        $group: {
                            _id: "$tags",
                            tagName: {"$first": "$tags"},
                            count: {$sum: 1}
                        }
                    }
                ])
            }
        },
        blogsCount: {
            type: GraphQLInt,
            async resolve(parent, args) {
                return await Blog.count({publish: true})
            }
        }

    })
})


const BlogPageType = new GraphQLObjectType({
    name: "BlogPageType",
    description: "Faydali bilgiler page type",
    fields: () => ({
        blog: {
            type: BlogType,
        },
        allTags: {
            type: new GraphQLList(AllTagsType),
            async resolve(parent, args) {
                return Blog.aggregate([
                    {$match: {"publish": true}},
                    {$unwind: "$tags"},
                    {
                        $group: {
                            _id: "$tags",
                            tagName: {"$first": "$tags"},
                            count: {$sum: 1}
                        }
                    }
                ])
            }
        },
        blogsCount: {
            type: GraphQLInt,
            async resolve(parent, args) {
                return await Blog.count({publish: true})
            }
        },
        randomBlog: {
            type: new GraphQLList(BlogType),
            async resolve(parent, args) {
                const count = await Blog.count({publish: true})
                const blogsCount = count > 3 ? count - 2 : count - 1
                var random = Math.floor(Math.random() * blogsCount)
                return Blog.find({_id: {$ne: parent.blog._id}, publish: true}).skip(random).limit(2)
            }
        }
    })
})




module.exports = {
    UserType,
    TokenType,
    PagesType,
    SiteType,
    CalismaTablosuType,
    IndexSliderType,
    HizmetStandartlariType,
    OtherIletisimType,
    IletisimType,
    BlogType,
    BlogsPageType,
    BlogPageType
}