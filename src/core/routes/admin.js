const adminController = require('../controllers/admin')
const express = require('express')
const router = express.Router()

router.get('/best-clients', async (req, res) => { await adminController.getBestClients(req, res) })
router.get('/best-profession', async (req, res) => { await adminController.getBestProfessions(req, res) })

module.exports = router;