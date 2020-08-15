const queue = require("../config/kue");
const verifyEmailMailer = require("../mailers/verify_email_mailer");

//sending mail into queue to send for verification Email
queue.process("verifyEmail", function (job, done) {
  verifyEmailMailer.verifyEmail(job.data);
  done();
});
