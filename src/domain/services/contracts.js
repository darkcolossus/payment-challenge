const contractRepository = require('../../core/db/repositories/contract')

const getContract = async (id, profileId) => {
    try {
        console.log(`contract service`)
        return await contractRepository.getContract(id, profileId)
    } catch (e) {
        console.error(`Error when trying to find contract ${id}. Message: ${e.message}`)
        throw e
    }
}

const getNonTerminated = async (profileId) => {
    try {
        console.log(`non terminated contract service`)
        console.log(profileId)
        return await contractRepository.getNonTerminated(profileId)
    } catch (e) {
        console.error(`Error when trying to find non terminated contracts. Message: ${e.message}`)
        throw e
    }
}

module.exports = {getContract, getNonTerminated}

