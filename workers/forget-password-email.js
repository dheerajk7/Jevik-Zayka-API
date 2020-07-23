const queue = require("../config/kue");
const forgetPasswordMailer = require("../mailers/forget_password_mailer");

//sending mail into queue to send for forget password
queue.process("forgetPasswordEmails", function (job, done) {
  forgetPasswordMailer.forgetPassword(job.data);
  done();
});
