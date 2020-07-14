const express = require("express");
const router = express.Router();

const resetPasswordController = require("../../../controllers/api/v1/reset_password_controller");

router.post("/reset-mail", resetPasswordController.resetMail);
router.post("/save-password", resetPasswordController.savePassword);

module.exports = router;
