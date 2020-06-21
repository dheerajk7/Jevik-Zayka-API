const express = require('express');
const router = express.Router();

//accessing home controller
var homeController = require('../controllers/home_controller');

//routes
router.get('/',homeController.home);
router.use('/users',require('./user'));
router.use('/reset-password', require('./reset-password'));
router.use('/product',require('./product'));

module.exports = router;