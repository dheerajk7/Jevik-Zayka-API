const express = require('express');
const router = express.Router();

//accessing home controller
var productController = require('../controllers/product_controller');

//routes
router.get('/',productController.home);

module.exports = router;