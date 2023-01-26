const adminService = require('../../domain/services/admin')

const getBestClients = async (req, res) => {
    try {
        const start = String(req.query.start)
        const end = String(req.query.end)
        const limit = Number(req.query.limit || 2)
    
        const bestClients = await adminService.getBestClients(start, end, limit)
    
        if(!bestClients) return res.status(404).end()
        res.json(bestClients)
    } catch (e) {
        // TODO make better error responses
        res.status(500).send(e.message)
    }
    
}

const getBestProfessions = async (req, res) => {
    try {
        const start = String(req.query.start)
        const end = String(req.query.end)

        const bestProfessions = await adminService.getBestProfessions(start, end)
        
        if(!bestProfessions) return res.status(404).end()
        
        res.json(bestProfessions)
        //buildResponse(contracts, res)
    } catch (e) {
        // TODO make better error responses
        res.status(500).send(e.message)
    }
}

module.exports = {getBestClients, getBestProfessions}