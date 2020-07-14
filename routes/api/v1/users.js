const express = require("express");
const router = express.Router();

const userController = require("../../../controllers/api/v1/users_controller");
const passport = require("passport");

router.post("/create-user", userController.createUser);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.profile
);
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  userController.update
);

router.delete("/delete", userController.delete);

module.exports = router;
