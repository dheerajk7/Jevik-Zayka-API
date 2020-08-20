const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const env = require('../../../config/environment');
module.exports.createSession = async function (request, response) {
  try {
    //finding user with phone number or email
    let username = request.body.username.toLowerCase();
    let user = await User.findOne({
      $or: [{ email: username }, { mobile_number: username }],
    });
    if (!user) {
      return response.status(401).json({
        success: false,
        message: 'Invalid Credentials...Register if not registered yet',
      });
    }

    //compairing encrypted password with the input password
    bcrypt.compare(request.body.password, user.password, function (
      err,
      result
    ) {
      //if password doesn't matched
      if (result != true) {
        return response.status(401).json({
          success: false,
          message: 'Invalid username or password',
        });
      }
      //if password matched returning user and token
      return response.status(200).json({
        data: {
          token: jwt.sign(user.toObject(), env.jwt_secret, {
            expiresIn: 100000,
          }),
        },
        message: 'Sign In successful,here is your token, keep it safe',
        success: true,
      });
    });
  } catch (err) {
    console.log('error', err);
    return response.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
