const express = require('express');
const router = express.Router();

const userApiController = require('../../../controllers/api/v1/user_api');
const passport = require('passport');

router.post('/create-session',userApiController.createSession);
router.post('/add-user',userApiController.createUser);
router.get('/user-profile',passport.authenticate('jwt',{session:false}),userApiController.userProfile);
router.post('/update',passport.authenticate('jwt',{session:false}),userApiController.update);

module.exports = router;