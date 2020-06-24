const express = require('express');
const router = express.Router();
const passport  = require('passport');
//accessing home controller
var productController = require('../controllers/product_controller');

//routes
router.get('/',productController.home);
router.get('/add-product',passport.checkAuthentication,productController.addProduct);
router.post('/create-product',passport.checkAuthentication,productController.createProduct);

module.exports = router;