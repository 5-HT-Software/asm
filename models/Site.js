const mongoose = require("mongoose")

const SiteSchema = new mongoose.Schema({
    site_name: {
        type: String,
        required: true
    },
    site_long_name: {
        type: String
    }
})

module.exports = mongoose.model("site", SiteSchema)