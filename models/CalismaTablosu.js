const mongoose = require("mongoose")

const calismaTablosuSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    }
},
    {timestamps: true}
)

module.exports = mongoose.model("CalismaTablosu", calismaTablosuSchema)