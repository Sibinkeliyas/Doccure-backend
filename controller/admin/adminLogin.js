const adminHelpers = require('../../helpers/adminHelpers/adminLogin')
const generateToken = require('../../middleware/generateToken')

exports.admin_register_post = ((req , res) => {               // admin signup
    try {
        adminHelpers.doSignUp(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
})


exports.admin_login_post = (req , res) => {                     // admin login
    try {
        adminHelpers.dogLogin(req.body).then((data) => {
            let details = {
                email : data.email ,
                name : data.name ,
                _id : data._id ,
                token : generateToken(data._id) ,
                }
            res.status(200).json(details)  
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.admin_find = ( req , res ) => {
    try {
        adminHelpers.doFindAdimin(req.body.adminId).then((data) => {
            res.status(200).json(data)  
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}
