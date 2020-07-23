const User = require("../models/user");
const ResetToken = require("../models/forget-password-token");
const forgetPasswordMailer = require("../mailers/forget_password_mailer");

module.exports.reset = function (request, response) {
  return response.render("reset-password", {
    title: "Reset Password | JAIVIK JAAYAKA",
  });
};

module.exports.resetMail = async function (request, response) {
  try {
    let user = await User.findOne({ email: request.body.email.toLowerCase() });
    await ResetToken.findOneAndDelete({
      email: request.body.email.toLowerCase(),
    });
    if (user) {
      let token = await ResetToken.create({
        email: request.body.email.toLowerCase(),
        access_token: Date.now(),
        is_valid: true,
      });
      forgetPasswordMailer.forgetPassword(token);
      return response.redirect("/users/sign-in");
    } else {
      return response.redirect("back");
    }
  } catch (err) {
    console.log("Error in creating reset token");
    return;
  }
};

module.exports.setPassword = async function (request, response) {
  try {
    let token = await ResetToken.findOne({
      access_token: request.params.token,
    });
    if (token && token.is_valid) {
      return response.render("set-password", {
        title: "Set Password | JAIVIK JAAYAKA",
        token: token.access_token,
      });
    } else {
      console.log("Link Expired");
      return response.redirect("/users/reset-password");
    }
  } catch (err) {
    console.log("Error in reseting Password");
    return;
  }
};

module.exports.savePassword = async function (request, response) {
  try {
    if (request.body.new_password === request.body.confirm_password) {
      let token = await ResetToken.findOne({
        access_token: request.params.token,
      });
      if (token && token.is_valid) {
        await token.updateOne({ is_valid: false });
        let user = User.findOne({ email: token.email });
        if (user) {
          await (await user).updateOne({ password: request.body.new_password });
          console.log("Password changed successfull");
          await ResetToken.deleteOne({ access_token: request.params.token });
          return response.redirect("/users/sign-in");
        } else {
          console.log("User Does not exist with these mail");
          return response.redirect("/reset-password");
        }
      } else {
        console.log("Link Expired");
        return response.redirect("/reset-password");
      }
    } else {
      console.log("Password does not matched");
      return redirect("back");
    }
  } catch (err) {
    console.log("Error in saving password");
    return;
  }
};
