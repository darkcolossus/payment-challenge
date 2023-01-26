const adminRepository = require('../../core/db/repositories/admin')

const getBestClients = async (start, end, limit = 2) => {
    try {
        console.log(`best clients service`)
        return await adminRepository.getBestClients(start, end, limit)
    } catch (e) {
        console.error(`Error when trying to get best clients. Message: ${e.message}`)
        throw e
    }
}

const getBestProfessions = async (start, end) => {
    try {
        console.log(`best professions service`)
        return await adminRepository.getBestProfessions(start, end)
    } catch (e) {
        console.error(`Error when trying to get best professions. Message: ${e.message}`)
        throw e
    }
}

module.exports = {getBestClients, getBestProfessions}

