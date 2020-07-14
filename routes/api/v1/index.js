const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/products", require("./products"));
router.use("/users", require("./users"));
router.use("/orders", require("./orders"));
router.use("/reset-password", require("./reset_password"));

module.exports = router;
