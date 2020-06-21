const express = require('express');
const router = express.Router();

//accessing reset controller
var resetController = require('../controllers/reset_password_controller');

//routes
router.get('/',resetController.reset);
router.post('/reset-mail',resetController.resetMail);
router.get('/set-password/:token',resetController.setPassword);
router.post('/save-password/:token',resetController.savePassword);

module.exports = router;