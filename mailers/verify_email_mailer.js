const nodeMailer = require("../config/nodemailer");

exports.verifyEmail = (token) => {
  let htmlString = nodeMailer.renderTemplate(
    { token: token },
    "/verify-email/verify-email.ejs"
  );
  nodeMailer.transporter.sendMail(
    {
      from: "contact@jaivikjaayaka.com",
      to: token.user.email,
      subject: "Verify Email",
      html: htmlString,
    },
    function (err, info) {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      return;
    }
  );
};
