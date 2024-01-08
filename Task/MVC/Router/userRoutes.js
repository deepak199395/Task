const express = require('express');
const { userRegister, getuser, userloginController } = require('../Controller/userController');

const router= express.Router();

// post user 
router.post('/user-Register',userRegister);

// get user 
router.get('/get-alluser',getuser);

// user login 
router.post('/user-login',userloginController)

module.exports= router;