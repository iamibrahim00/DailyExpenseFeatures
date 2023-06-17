const { Router } = require('express');
const express = require('express');

const forgetPasswordController = require('../controllers/forgetPassword');

const router = express.Router()

router.post('/password/forgetpassword', forgetPasswordController.forgetPassword);


module.exports = router 