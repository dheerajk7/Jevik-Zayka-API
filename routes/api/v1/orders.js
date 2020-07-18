const express = require("express");
const router = express.Router();
const passport = require("passport");

const orderController = require("../../../controllers/api/v1/orders_controller");

router.post(
  "/create-order",
  passport.authenticate("jwt", { session: false }),
  orderController.createOrder
);
router.get(
  "/get-all-orders",
  passport.authenticate("jwt", { session: false }),
  orderController.getAllOrder
);
router.get(
  "/order-detail/:order_id",
  passport.authenticate("jwt", { session: false }),
  orderController.orderDetail
);
router.delete(
  "/delete-order",
  passport.authenticate("jwt", { session: false }),
  orderController.deleteOrder
);

module.exports = router;
