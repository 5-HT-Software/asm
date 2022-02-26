const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
        },
        surname: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        avatar: {
            type: String,
            default: "/dist/images/user.png",
        },
        password: {
            type: String,
        },
        authority:
        {
            type: String,
        },

    },
    {timestamps: true},
);

module.exports = mongoose.model("user", UserSchema);