const ForgetPasswordToken = require('../../../models/forget-password-token');
const User = require('../../../models/user');
const queue = require('../../../config/kue');
const bcrypt = require('bcrypt');
const forgetPasswordMailerWorker = require('../../../workers/forget-password-email');

module.exports.resetMail = async function (request, response) {
  try {
    //getting reset token if already created by user
    let email = request.body.email.toLowerCase();
    let token = await ForgetPasswordToken.findOne({
      email: email,
    });

    if (!token) {
      let user = await User.findOne({ email: email });
      console.log(user);
      if (!user) {
        return response.status(401).json({
          success: false,
          message: 'Invalid Email Address',
        });
      }
      token = await ForgetPasswordToken.create({
        email: email,
        name: user.first_name,
        access_token: Date.now(),
      });
    }
    queue.create('forgetPasswordEmails', token).save();
    return response.status(200).json({
      success: true,
      message: 'Reset password mail sent to the registered mail',
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      messsage: 'Internal Server Error',
    });
  }
};

module.exports.savePassword = async function (request, response) {
  try {
    if (request.body.password !== request.body.confirm_password) {
      return response.status(401).json({
        success: false,
        message: 'Password does not matched',
      });
    }
    let token = await ForgetPasswordToken.findOne({
      access_token: request.params.access_token,
    });
    if (token) {
      let user = await User.findOneAndUpdate(
        { email: token.email },
        { useFindAndModify: false }
      );
      // console.log(user);
      if (user) {
        let salt = 7;
        //encrypting password
        let passwordHash = await bcrypt.hash(request.body.password, salt);
        console.log('passwrod', user.password);
        user.password = passwordHash;
        user.is_password_available = true;
        await user.save();
        await ForgetPasswordToken.findByIdAndDelete(token.id);
        return response.status(200).json({
          success: true,
          message: 'Password Changed Successfully',
        });
      }
      return response.status(401).json({
        success: false,
        message: 'Link Expired',
      });
    }
    return response.status(401).json({
      success: false,
      message: 'Link Expired',
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
