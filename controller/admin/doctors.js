const { reject } = require('promise')
const adminDoctor = require('../../helpers/adminHelpers/adminDoctorsHelper')

exports.admin_add_doctors = (req , res ) => {
    try {
        adminDoctor.doAdd(req.body.doctorData).then((data) => {
            adminDoctor.doFindDoctors(req.body.filter).then((doc) => {
            res.status(200).json({data , doc})
            })
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.admin_doctors = (req , res ) => {
    try {
        console.log(req.body);
        adminDoctor.doFindDoctors(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((error) => {
            res.status(401).json(error)
        })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.admin_delete_doctors = (req , res ) => {
    try {
        adminDoctor.doDeleteDoctors(req.body.id).then((data) => {
            adminDoctor.doFindDoctors(req.body.filter).then((data) => {
                res.status(200).json(data)
            }).catch((err) => {
                reject(err)
            })
        }).catch((err) => {
            console.log(err);
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}