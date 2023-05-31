const { Router } = require('express');
const express = require('express');


const PurchaseController = require('../controllers/purchase');
const UserAuthenticate = require('../middleware/auth');

const router = express.Router()

router.get("/premiummembership",UserAuthenticate.authenticate,PurchaseController.purchasepremium)
router.post("/updatetansactions",UserAuthenticate.authenticate,PurchaseController.updateTransactionStatus)

module.exports = router 