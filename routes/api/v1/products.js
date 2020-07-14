const express = require("express");
const router = express.Router();

const productController = require("../../../controllers/api/v1/products_controller");

router.get("/get-products", productController.getProducts);
router.post("/add-product", productController.addProduct);
router.delete("/delete-product", productController.deleteProduct);
router.get("/product-detail/:product_id", productController.productDetail);

module.exports = router;
