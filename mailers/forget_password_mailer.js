const nodeMailer = require("../config/nodemailer");

exports.forgetPassword = (token) => {
  let htmlString = nodeMailer.renderTemplate(
    { token: token },
    "/reset/reset_password.ejs"
  );
  nodeMailer.transporter.sendMail(
    {
      from: "contact@jaivikjaayaka.com",
      to: token.email,
      subject: "Reset Password",
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
