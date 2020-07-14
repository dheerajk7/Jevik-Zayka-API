const express = require("express");
const router = express.Router();

const authController = require("../../../controllers/api/v1/auth_controller");

router.post("/create-session", authController.createSession);

module.exports = router;
