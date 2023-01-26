const {Profile} = require('../db/models/model')


const getProfile = async (req, res, next) => {
    const profileId = req.get('profile_id')

    console.log(`profileId: ${profileId}`)

    // Add profileId check.
    if(!profileId) {
        return res.status(400).end()
    }

    const profile = await Profile.findOne({where: {id: profileId}})

    if(!profile) return res.status(401).end()
    
    req.app.set('profile', profile)
    //req.profile = profile
    next()
}
module.exports = {getProfile}