const express = require("express");
const router = express.Router();

const orderController = require("../../../controllers/api/v1/orders_controller");

router.post("/create-order", orderController.createOrder);
router.get("/get-all-order", orderController.getAllOrder);
router.get("/order-detail/:order_id", orderController.orderDetail);
router.delete("/delete-order", orderController.deleteOrder);

module.exports = router;
