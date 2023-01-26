const {sequelize, Contract} = require('../models/model')
const { Op, QueryTypes } = require("sequelize")

const getBestClients = async (start, end, limit) => {
    return await sequelize.query(
                `
                        SELECT "ClientId", SUM("price") AS "totalPaid"
                        FROM "Jobs"
                        INNER JOIN "Contracts" ON "Jobs"."ContractId" = "Contracts"."id"
                        INNER JOIN "Profiles" ON "Contracts"."ClientId" = "Profiles"."id"
                        WHERE "Jobs"."paid" = true
                        AND "Jobs"."paymentDate" BETWEEN :start AND :end
                        GROUP BY "ClientId"
                        ORDER BY "totalPaid" DESC
                        LIMIT :limit
                    `,
            {
                        replacements: { start, end, limit },
                        type: QueryTypes.SELECT,
                    }
                )
}

const getBestProfessions = async (start, end) => {
    return await sequelize.query(
                `
                        SELECT "profession", SUM("price") AS "totalPaid"
                        FROM "Jobs"
                        INNER JOIN "Contracts" ON "Jobs"."ContractId" = "Contracts"."id"
                        INNER JOIN "Profiles" ON "Contracts"."ContractorId" = "Profiles"."id"
                        WHERE "Jobs"."paid" = true
                        AND "Jobs"."paymentDate" BETWEEN :start AND :end
                        GROUP BY "profession"
                        ORDER BY "totalPaid" DESC
                        LIMIT 1
                    `,
                    {
                        replacements: { start, end },
                        type: QueryTypes.SELECT,
                    }
                )
}



module.exports = {getBestClients, getBestProfessions}