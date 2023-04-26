const { Router } = require('express');
const express = require('express');

const ExpenseController = require('../controllers/dailyExpense');

const router = express.Router()


router.post('/user/signup',ExpenseController.postDailyExpense)


module.exports = router