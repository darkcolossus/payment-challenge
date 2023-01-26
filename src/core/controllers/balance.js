const balanceService = require('../../domain/services/balance')

const deposit = async (req, res) => {

    try {
        const profile = req.app.get('profile')

        if (profile.type !== 'client') {
            res.status(401).send('A contractor is not able to make deposits')
        }

        const userId = Number(req.params.userId)
        const amount = Number(req.body.amount)
        console.log(`USERRRRR: ${userId}`)
        const deposit = await balanceService.deposit(profile, userId, amount)
    
        if(!deposit) return res.status(404).end()
        res.json(deposit)
    } catch (e) {
        // TODO make better error responses
        res.status(500).send(e.message)
    }
}

module.exports = {deposit}