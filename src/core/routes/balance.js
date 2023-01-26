const balanceController = require('../controllers/balance')
const express = require('express')
const router = express.Router()

router.post('/deposit/:userId', async (req, res) => { await balanceController.deposit(req, res) })

module.exports = router;