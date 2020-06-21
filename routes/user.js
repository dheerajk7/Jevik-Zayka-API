const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

//routes
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
router.post('/create-user',userController.creatUser);
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/users/sign-in',
    }
),userController.createSession);  
router.get('/sign-out',passport.checkAuthentication,userController.signOut);
router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/edit-profile',passport.checkAuthentication,userController.edit);
router.post('/update',passport.checkAuthentication,userController.update);

module.exports = router;