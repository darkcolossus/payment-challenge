const contractController = require('../controllers/contract')
const express = require('express')
const router = express.Router()

router.get('/:id', async (req, res) => { await contractController.getContract(req, res) })
router.get('/', async (req, res) => { await contractController.getNonTerminated(req, res) })

module.exports = router;