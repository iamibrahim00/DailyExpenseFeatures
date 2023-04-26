const { Router } = require('express');
const express = require('express');

const ExpenseController = require('../controllers/expense');

const router = express.Router()


router.post('/user/add-expense',ExpenseController.postExpense)

router.get('/user/get-expense',ExpenseController.getExpense)

router.delete('/user/delete-expense/:id',ExpenseController.deleteExpense)

module.exports = router