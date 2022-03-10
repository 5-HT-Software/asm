const {IletisimType, OtherIletisimType} = require("../types")
const {Iletisim} = require("../../models")


const iletisim = {
  type: IletisimType,
  description: "Retrieve last item on Iletisim",
  resolve(parent, args) {
    return Iletisim.findOne()
  }
}


module.exports = {iletisim}
