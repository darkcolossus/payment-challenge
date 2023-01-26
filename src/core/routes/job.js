const jobController = require('../controllers/job')
const express = require('express')
const router = express.Router()

router.get('/unpaid', async (req, res) => { await jobController.getUnpaid(req, res) })
router.post('/:job_id/pay', async (req, res) => { await jobController.pay(req, res) })

module.exports = router;