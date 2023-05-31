const { Router } = require('express');
const express = require('express');

const loginController = require('../controllers/login');

const router = express.Router()

router.post('/user/signup', loginController.signup);
router.post('/user/login',loginController.login)


module.exports = router 