const mongoose = require("mongoose");

const verificationEmailTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    access_token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const verificationEmailTokenModel = mongoose.model(
  "VerificationEmailToken",
  verificationEmailTokenSchema
);
module.exports = verificationEmailTokenModel;
