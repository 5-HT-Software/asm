const {SiteType} = require("../types")
const {Site} = require("../../models")


const site = {
  type: SiteType,
  description: "Retrieve last item on Site",
  resolve(parent, args) {
    return Site.findOne()
  }
}

module.exports = {site}
