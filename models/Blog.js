const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String
        },
        publish: {
            type: Boolean,
            default: false
        },
        tags: [{
            type: String
        }],
    },
    {timestamps: true}
)

module.exports = mongoose.model("blog", BlogSchema)