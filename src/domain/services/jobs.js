const jobRepository = require('../../core/db/repositories/job')
const contractRepository = require('../../core/db/repositories/contract')
const profileRepository = require('../../core/db/repositories/profile')

// const {sequelize} = require('sequelize')
const {sequelize} = require('../../core/db/models/model')
const { Transaction } = require('sequelize')


const getUnpaid = async (profileId) => {
    try {
        console.log(`unpaid job service`)
        console.log(profileId)

        const contractsInProgress = await contractRepository.getContractsInProgress(profileId)
        const ids = contractsInProgress.map((contract) => contract.id)
        return await jobRepository.getUnpaid(ids)
    } catch (e) {
        console.error(`Error when trying to get unpaid jobs. Message: ${e.message}`)
        throw e
    }
}

const pay = async (profileId, jobId) => {

    try {
        return await sequelize.transaction(async (t) => {

            const options = {transaction: t, lock: t.LOCK.UPDATE}

            const job = await jobRepository.getJobById(jobId, options)

            if (!job) {
                console.log(`Job id ${jobId} not found`)
                return res.json('job not found')
            }

            const contract = await contractRepository.getContractById(job.ContractId, options)

            if (!contract) {
                console.log('job not found')
                return res.json('job not found')
            }

            const client = await profileRepository.getProfileById(contract.ClientId, options)
            const contractor = await profileRepository.getProfileById(contract.ContractorId, options)

            if(!client) throw new Error('Unknown client')
            if(!contractor) throw new Error('Unknown contractor')
            if(client.balance < job.price) throw Error('Insufficient balance to pay this job')
            
            /* Payment */
            await jobRepository.pay(jobId, options)
            await profileRepository.decreaseBalance(client.id, job.price, options)
            return await profileRepository.increaseBalance(contractor.id, job.price, options)
            /* End payment */
        })
    } catch (e) {
        console.error(`Error when trying to pay. Message: ${e.message}`)
        throw e
    }
}

module.exports = {getUnpaid, pay}

