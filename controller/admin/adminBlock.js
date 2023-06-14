const { doBlockUser, doBlockDoctor } = require("../../helpers/adminHelpers/adminBlock")

exports.adminBlockUser = (req , res) => {
    try {
        doBlockUser(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}
exports.adminBlockDoctor = (req , res) => {
    try {
        doBlockDoctor(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}