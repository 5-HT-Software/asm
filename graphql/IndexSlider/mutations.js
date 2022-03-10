const {IndexSliderType} = require("../types")
const {IndexSlider} = require("../../models")
const {GraphQLString, GraphQLID, GraphQLList, GraphQLInt, GraphQLBoolean} = require("graphql")

const indexSliderCreate = {
  type: IndexSliderType,
  description: "Creates a Index Slider Item",
  args: {
    url: {type: GraphQLString},
    order: {type: GraphQLInt},
  },
  async resolve(parent, args) {
    const indexSlider = new IndexSlider(args)
    return await indexSlider.save()
  }
}

const indexSliderUpdate = {
  type: IndexSliderType,
  description: "Update a Index Slider Item",
  args: {
    _id: {type: GraphQLString},
    url: {type: GraphQLString},
    order: {type: GraphQLInt},
    publish: {type: GraphQLBoolean}
  },
  resolve: async function (parent, args) {
    const {_id} = args
    const indexSlider = await IndexSlider.findByIdAndUpdate(_id, args, {omitUndefined: true, upsert: true, new: true})
    if (!indexSlider) throw new Error("Güncelleme sırasında bir hata oluştu lütfen daha sonra tekrar deneyiniz!")
    return indexSlider
  }
}

const indexSliderDelete = {
  type: IndexSliderType,
  description: "Removes a Index Slider Item",
  args: {
    _id: {type: GraphQLID}
  },
  async resolve(parent, args) {
    const {_id} = args
    const indexSlider = await IndexSlider.findByIdAndRemove(_id)
    if (!indexSlider) throw new Error("Anasayfa Slider bulunamadı!")
    return indexSlider
  }
}
module.exports = {indexSliderCreate, indexSliderUpdate, indexSliderDelete}