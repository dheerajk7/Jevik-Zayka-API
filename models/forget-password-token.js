const mongoose = require("mongoose");

const forgetPasswordTokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    access_token: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const forgetPasswordTokenModel = mongoose.model(
  "ForgetPasswordToken",
  forgetPasswordTokenSchema
);
module.exports = forgetPasswordTokenModel;
