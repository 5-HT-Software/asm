const mongoose = require("mongoose")
const {User, Site} = require("./models")
const bcrypt = require("bcryptjs")
const mongoURI = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`
const connectDB = async () => {
    const conn = await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    if (await User.countDocuments() == 0) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash("1", salt)
        const user = new User({email: "ismetkagan@yahoo.com.tr", password: hash, name: "admin", username: "admin", authority: "superAdmin"})
        user.save()
    }
    if (await Site.countDocuments() == 0) {
        const site = new Site({site_name: "Bilmemne ASM", site_long_name: "Bilmemne Aile Sağlık Merkezi"})
        site.save()
    }
    console.log(`MongoDB connected`)
    return mongoose.connection.getClient()
}

module.exports = {connectDB}