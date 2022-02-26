const express = require("express")
const http = require('http')
const exphbs = require("express-handlebars")
const cookieParser = require("cookie-parser")
const MongoStore = require("connect-mongo")
const helpers = require("handlebars-helpers")()
const flash = require("connect-flash")
const morgan = require("morgan")
const helmet = require("helmet")
const path = require("path")
const session = require("express-session")
const passport = require("passport")
require("./controllers/auth/local")
const handlebarsHelpers = require("./helpers/handlebarsHelpers")
const allHelpers = {
    ...helpers,
    ...handlebarsHelpers
}
require("dotenv").config()

require("./folderCheck")

const {
    connectDB
} = require("./db")

const clientPromise = connectDB()

var app = express()
const server = http.createServer(app);
//TODO Comment sistemi
//TODO Courseinfo sayfası

// Basic Security - Helmet
app.use(
    helmet({
        contentSecurityPolicy: false
    })
)

// Bodyparser
app.use(express.json({
    limit: "50mb"
})).use(
    express.urlencoded({
        extended: true,
        limit: "250mb"
    })
)

// Public explanation
app.use(express.static(path.join(__dirname, "public")))

// Template Engine
const hbs = exphbs.create({
    extname: "handlebars",
    defaultLayout: "main",
    helpers: allHelpers,
})

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

// Morgan explanation
app.use(morgan("dev"))

// Connect Flash
app.use(flash())

// Session
app.use(
    session({
        secret: "white rabbit",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            clientPromise
        })
    })
)
// Session

app.use(cookieParser("white rabbit"))

// Passport
app.use(passport.initialize())
app.use(passport.session())
//locals
app.use(async (req, res, next) => {
    res.locals.flashMessages = {
        error: req.flash("error"),
        success: req.flash("success"),
        warning: req.flash("warning")
    }
    res.locals.auth = req.user
    next()
})


app.use("/", require("./routers"))
app.use("/admin", require("./routers/admin"))


//Error handler function
app.use((err, req, res, next) => {
    const error = app.get("env") === "development" ? err : {}
    const status = err.status || 500
    console.log(err)
    //Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    })
    //Respond to ourselves
    console.error(err)
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});