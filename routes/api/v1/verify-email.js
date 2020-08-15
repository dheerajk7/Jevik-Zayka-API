const express = require("express");
const router = express.Router();
const passport = require("passport");

const verifyEmailController = require("../../../controllers/api/v1/verify_email_controller");

router.get(
  "/send-mail",
  passport.authenticate("jwt", { session: false }),
  verifyEmailController.sendMail
);
router.get(
  "/verify/:verification_token",
  passport.authenticate("jwt", { session: false }),
  verifyEmailController.verify
);

module.exports = router;
