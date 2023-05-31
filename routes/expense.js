const { Router } = require('express');
const express = require('express');

const ExpenseController = require('../controllers/expense');
const UserAuthenticate = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router()


router.post('/user/add-expense',ExpenseController.postExpense)

router.get('/user/get-expense',UserAuthenticate.authenticate,ExpenseController.getExpense)

router.delete('/user/delete-expense/:id',UserAuthenticate.authenticate,ExpenseController.deleteExpense)

module.exports = router 