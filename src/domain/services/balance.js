const contractRepository = require('../../core/db/repositories/contract')
const jobRepository = require('../../core/db/repositories/job')
const profileRepository = require('../../core/db/repositories/profile')
const {sequelize} = require('../../core/db/models/model')


const deposit = async (profile, userId, amount) => {
    try {
        const clientsContractsInProgress = await contractRepository.getclientsContractsInProgress(profile.id)

        const clientsContractsInProgressIds = clientsContractsInProgress.map(contract => contract.id)
        const debtFromContracts = await jobRepository.getDebtFromContracts(clientsContractsInProgressIds)
        const depositLimit = 0.25 * debtFromContracts

        if (amount > depositLimit) throw new Error(`Deposit limit exceeded. Max deposit is ${depositLimit}`)

        const balance = await sequelize.transaction(async (t) => {
            const options = { transaction: t , lock: t.LOCK.UPDATE }

            return await profileRepository.increaseBalance(userId, amount, options)
        })

        return balance
    } catch (e) {
        console.error(`Error when trying to get best clients. Message: ${e.message}`)
        throw e
    }
}

module.exports = {deposit}

