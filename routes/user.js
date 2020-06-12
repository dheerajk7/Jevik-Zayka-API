const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');
const { route } = require('.');

//routes
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
router.post('/create-user',userController.creatUser);
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/users/signin',
    }
),userController.createSession);  
router.get('/sign-out',passport.checkAuthentication,userController.signOut);

module.exports = router;