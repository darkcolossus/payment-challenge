const {sequelize, Profile, Contract} = require('../models/model')
const { Op, QueryTypes, Transaction } = require("sequelize")

const getContract = async (id, profileId) => {
    return await Contract.findOne({where: {[Op.and]: [{id: id}, {[Op.or]: [{clientId: profileId}, {contractorId: profileId}]}]}})
}

const getNonTerminated = async (profileId) => {
    return await Contract.findAll({where: { status: { [Op.not]: 'terminated'}, [Op.or]: [{clientId: profileId}, {contractorId: profileId}]}})
}

const getContractsInProgress = async (profileId) => {
    return await Contract.findAll({where: {[Op.and]: [{status: {[Op.eq]: 'in_progress'}}, {[Op.or]: [{clientId: profileId}, {contractorId: profileId}]}]}})
}

const getclientsContractsInProgress = async (profileId) => {
    return await Contract.findAll({where: { status: 'in_progress', ClientId: profileId}})
}

const getContractById = async(id, databaseTransactionConfig) => {
    return await Contract.findOne({
        where: { id: id },
        ...databaseTransactionConfig
    })
}

module.exports = {getContract, getNonTerminated, getContractsInProgress, getclientsContractsInProgress, getContractById}