const contractService = require('../../domain/services/contracts')

const getContract = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const profile = req.app.get('profile')

        const contract = await contractService.getContract(id, profile.id)
        
        if(!contract) return res.status(404).end()
        res.json(contract)

    } catch(e) {
        res.status(500).send(e.message)
    }
    
}

const getNonTerminated = async (req, res) => {
    try {
        const profile = req.app.get('profile')
        console.log(`EL MAGICO PERFIL: ${JSON.stringify(profile)}`)
        const contracts = await contractService.getNonTerminated(profile.id)
        
        if(!contracts) return res.status(404).end()
        
        res.json(contracts)
        //buildResponse(contracts, res)
    } catch (e) {
        // TODO make better error responses
        res.status(500).send(e.message)
    }
}

module.exports = {getContract, getNonTerminated}