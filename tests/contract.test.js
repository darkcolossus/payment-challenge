const contractService = require('../src/domain/services/contracts')
const contractRepository = require('../src/core/db/repositories/contract')

const { idText, JsxEmit } = require("typescript")

describe("Contract service endpoints", () => {
    describe("Returns a list of non terminated contracts belonging to a user. If not, return false in case it doesn't find contracts", () => {
        it("test /contracts", async() => {
            jest.spyOn(contractRepository, "getNonTerminated").mockReturnValue(Promise.resolve(null))

            const nonTerminatedContracts = await contractService.getNonTerminated(2)
            expect(nonTerminatedContracts).toBeFalsy();
        })
    })
})