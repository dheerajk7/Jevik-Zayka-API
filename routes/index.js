const express = require("express");
const router = express.Router();

//routes
router.use("/api", require("./api/index"));

module.exports = router;
