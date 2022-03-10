const {
  GraphQLList,
  GraphQLID,
  GraphQLBoolean
} = require("graphql")
const {IndexSliderType} = require("../types")
const {IndexSlider} = require("../../models")

const indexSliders = {
  type: new GraphQLList(IndexSliderType),
  description: "Get All Index Slider Items",
  args: {publish: {type: GraphQLBoolean, defaultValue: null}},
  resolve(parent, args) {
    let match = {}
    args.publish != null ? match.publish = args.publish : null
    return IndexSlider.find(match).sort("order")
  }
}

module.exports = {indexSliders}