const VerificationEmailToken = require('../../../models/verification-email-token');
const User = require('../../../models/user');
const queue = require('../../../config/kue');
const verificationEmailMailerWorker = require('../../../workers/verify-email');

module.exports.sendMail = async function (request, response) {
  try {
    if (request.user.is_verified === true) {
      return response.status(200).json({
        success: true,
        message: 'Email Already Verified',
      });
    }
    let token = await VerificationEmailToken.findOne({
      user: request.user.id,
    }).populate('user', 'first_name email');
    if (!token) {
      token = await VerificationEmailToken.create({
        user: request.user.id,
        access_token: Date.now(),
      });
      await VerificationEmailToken.populate(token, {
        path: 'user',
        select: 'first_name email',
      });
    }
    queue.create('verifyEmail', token).save();
    return response.status(200).json({
      success: true,
      message: 'Verification Mail Sent Successfully',
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports.verify = async function (request, response) {
  try {
    let token = await VerificationEmailToken.findOne({
      access_token: request.params.verification_token,
    });
    if (token) {
      let user = await User.findByIdAndUpdate(token.user);
      if (user) {
        user.is_verified = true;
        user.save();
        await VerificationEmailToken.findByIdAndDelete(token.id);
        console.log('a');
        return response.redirect('https://google.com');
        return response.status(200).json({
          success: true,
          message: 'Email Verified Successfully',
        });
      }
    }
    return response.status(401).json({
      success: false,
      message: 'Link Expired',
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
