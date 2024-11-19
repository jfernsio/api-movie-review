const roles = ['user','ADMIN']

import originalId from '../controllers/movies.js'
console.log(originalId)
const restrictTo = (roles) => {
    return function (req,res,next) {
        if(!originalId.role) {
            return res.status(200).json({
                msg:"Unauthuorized"
            })
        }
        if(!originalId.includes(req.roles.user)) {
            return res.status(404).json({
                msg:"user is not have right to acces"
            })
        }
        next()
    }
}

export default restrictTo