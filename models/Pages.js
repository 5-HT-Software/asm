const mongoose = require("mongoose")

const pagesSchema = new mongoose.Schema({
    page_name: {
        type: String,
        required: true
    },
    area_name: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
},
    {timestamps: true}
)

module.exports = mongoose.model("Pages", pagesSchema)