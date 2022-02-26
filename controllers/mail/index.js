const mailer = require("../../helpers/mailer")

const sendNewPasswordMail = (token, email) => {
    let message = {
        subject: "New Password",
        content: `
        <p>You can create your password from link</p>
        <a href="${process.env.SITE_DOMAIN}/recover-password/${token}">Click for new password</a>
        `
    }
    mailer.sendMail(message, email)
}

module.exports = {sendNewPasswordMail}