const {sequelize, Profile} = require('../models/model')
const { Op, TransactionOptions } = require("sequelize")


const getProfileById = async (id, databaseTransactionConfig) => {
    return await Profile.findByPk(id, { ...databaseTransactionConfig })
}

const decreaseBalance = async (userId, amount, databaseTransactionConfig) => {

    await Profile.decrement('balance', { by: amount, where: { id: userId }, ...databaseTransactionConfig })
    return getBalance(userId, databaseTransactionConfig)
}

const increaseBalance = async (userId, amount, databaseTransactionConfig) => {
    await Profile.increment('balance', {by: amount, where: { id: userId }, ...databaseTransactionConfig })
    return getBalance(userId, databaseTransactionConfig)
}

const getBalance = async (id, databaseTransactionConfig) => {
    return await Profile.findByPk(id, { attributes: ['balance'], ...databaseTransactionConfig})
}


module.exports = {getProfileById, decreaseBalance, increaseBalance, getBalance}
