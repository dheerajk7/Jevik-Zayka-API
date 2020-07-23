const express = require("express");
const router = express.Router();

const forgetPasswordController = require("../../../controllers/api/v1/forget_password_controller");

router.post("/forget-mail", forgetPasswordController.resetMail);
router.post(
  "/save-password/:access_token",
  forgetPasswordController.savePassword
);

module.exports = router;
