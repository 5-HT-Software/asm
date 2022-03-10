const sessionCheck = (req, res, next) => {
    if (req.isAuthenticated()) next()
    else res.redirect("/login")
}

const notAuthCheck = (req, res, next) => {
    if (!req.isAuthenticated()) next()
    else res.redirect("/admin")
}

module.exports = {sessionCheck, notAuthCheck}