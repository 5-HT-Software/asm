const mongoose = require("mongoose")

const tokenSchema = new mongoose.Schema({
    target_id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
},
    {timestamps: true}
)

tokenSchema.index({"createdAt": 1}, {expireAfterSeconds: 7200})

module.exports = mongoose.model("Token", tokenSchema)