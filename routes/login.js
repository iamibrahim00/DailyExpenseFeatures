const { Router } = require('express');
const express = require('express');

const ExpenseController = require('../controllers/login');

const router = express.Router()


router.post('/user/login',ExpenseController.login)


module.exports = router