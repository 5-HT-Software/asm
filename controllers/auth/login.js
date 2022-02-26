const passport = require("passport")

module.exports = async (req, res, next) => {
  let {username} = req.body
  passport.authenticate("local", (err, user, info) => {
    if (!user) {
      req.flash("error", err)
      return res.render("pages/auth/login", {layout: "login", username})
    }
    req.login(user, () => {
      req.flash("success", info.message)
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000 * 2
    })
    return res.status(200).redirect("/admin")
  })(req, res, next)
}
