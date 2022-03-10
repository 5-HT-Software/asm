const mongoose = require("mongoose")

const IndexSliderSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        },
        order: {
            type: Number
        },
        publish: {
            type: Boolean,
            default: false
        }
    }
)

module.exports = mongoose.model("indexSlider", IndexSliderSchema)