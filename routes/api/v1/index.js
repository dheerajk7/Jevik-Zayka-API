const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/products", require("./products"));
router.use("/users", require("./users"));
router.use("/orders", require("./orders"));
router.use("/forget-password", require("./forget_password"));
router.use("/verify-email", require("./verify-email"));

module.exports = router;
