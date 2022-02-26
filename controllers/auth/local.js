const LocalStrategy = require("passport-local").Strategy
const passport = require("passport")
const bcrypt = require("bcryptjs")
const {User} = require("../../models/")
const reqUserFillObj = require("./reqUserFill")

const localOptions = {usernameField: "username", passwordField: "password", passReqToCallback: true}
const successMessage = {message: "Başarıyla giriş yaptınız."}
const passwordFail = "Parolanız hatalı!"
const usernameFail = "Böyle bir kullanıcı bulunamadı!"

const login = async (req, username, password, done) => {
  let user = await User.findOne({username})
  if (!user) return done(usernameFail, false, {})
  if (await bcrypt.compare(password, user.password)) {
    let fillUser = await reqUserFillObj(user._id)
    return done(null, fillUser, successMessage)
  }
  return done(passwordFail, false, {})
}

passport.use(
  new LocalStrategy(localOptions, (req, username, password, done) => {
    return login(req, username, password, done)
  })
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(async function (user, done) {
  let userFill = await reqUserFillObj(user._id)
  done(null, userFill)
})