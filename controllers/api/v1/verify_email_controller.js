const VerificationEmailToken = require("../../../models/verification-email-token");

module.exports.sendMail = async function (request, response) {
  try {
    return response.status(200).json({
      user: request.user.toObject(),
      success: true,
      message: "Verification Mail Sent Successfully",
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.verify = async function (request, response) {
  try {
    return response.status(200).json({
      user: request.user.toObject(),
      params: request.params,
      success: true,
      message: "Verify is working",
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
