const mongoose = require("mongoose")

const HizmetStandartlariSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        order: {
            type: Number
        },
        documents: {
            type: String
        },
        duration: {
            type: String
        }
    }
)

module.exports = mongoose.model("hizmetStandartlari", HizmetStandartlariSchema)