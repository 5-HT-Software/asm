const nodemailer = require("nodemailer")

module.exports = {
  sendMail: async (message, email) => {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORT,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
    })
    return await transporter.sendMail(
      {
        from: `"Site Name" <${process.env.EMAIL}>`,
        to: email,
        subject: message.subject,
        html: message.content
      }
    )
  }
}