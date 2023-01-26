const {sequelize, Job} = require('../models/model')
const { Op, QueryTypes, Transaction } = require("sequelize")

const getUnpaid = async (ids) => {
    return  await Job.findAll({where: {paid: {[Op.not]: true}, ContractId: {[Op.in]: ids}}})
}

const getDebtFromContracts = async(ids) => {
    return await Job.sum("price", {where: { ContractId: { [Op.in]: ids, }, paid: {[Op.not]: true}}})
}

const getJobById = async(id, databaseTransactionConfig) => {
    return await Job.findByPk(id, { ...databaseTransactionConfig })
}

const pay = async(jobId, databaseTransactionConfig) => {
    console.log('a ver el id:')
    console.log(jobId)
    return await  Job.update( { paid: true }, { where: { id: jobId }, returning: true, ...databaseTransactionConfig })
}

module.exports = {getUnpaid, getDebtFromContracts, getJobById, pay}