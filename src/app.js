const express = require('express');
const bodyParser = require('body-parser');
const {sequelize, Profile} = require('./core/db/models/model')
const { Op, QueryTypes,Transaction } = require("sequelize")
const {getProfile} = require('./core/middleware/getProfile');
const { json } = require('express/lib/response');
const app = express();
app.use(bodyParser.json());

const contracts = require('./core/routes/contract')
const jobs = require('./core/routes/job')
const admin = require('./core/routes/admin')
const balances = require('./core/routes/balance')


app.use('/admin', getProfile, admin)
app.use('/contracts', getProfile, contracts)
app.use('/jobs', getProfile, jobs)
app.use('/balances', getProfile, balances)

module.exports = app;
