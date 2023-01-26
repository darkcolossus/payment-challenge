const jobService = require('../../domain/services/jobs')

const getUnpaid = async (req, res) => {
    // const id = Number(req.params.id)
    const profile = req.app.get('profile')

    const jobs = await jobService.getUnpaid(profile.id)
    
    /*const {Contract} = req.app.get('models')

    const contracts = await Contract.findAll({where: { status: { [Op.not]: 'terminated'}} })*/

    if(!jobs) return res.status(404).end()
    res.json(jobs)
}

const pay = async (req, res) => {
    try {
        const profile = req.app.get('profile')

        const jobId = Number(req.params.job_id)
        const pay = await jobService.pay(profile, jobId)
    
        if(!pay) return res.status(404).end()
        res.json(pay)
    } catch (e) {
        // TODO make better error responses
        res.status(500).send(e.message)
    }
}
module.exports = {getUnpaid, pay}