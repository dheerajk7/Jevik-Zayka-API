const express = require('express');
const router = express.Router();

const productController = require('../../../controllers/api/v1/product_api');

router.get('/get-products',productController.getProducts);

module.exports = router;