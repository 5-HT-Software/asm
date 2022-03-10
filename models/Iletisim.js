const mongoose = require("mongoose")

const IletisimSchema = new mongoose.Schema(
    {
        map: {
            type: String,
            required: true
        },
        mainAddress: {
            type: String
        },
        mainPhone: {
            type: String
        },
        others: [
            {
                name: {
                    type: String
                },
                address: {
                    type: String
                },
                phone: {
                    type: String
                },
            }
        ]
    }
)

module.exports = mongoose.model("iletisim", IletisimSchema)