const speciality = require('../../helpers/adminHelpers/adminSpeciality')

exports.admin_add_speciality = (req , res) => {
    try {
        speciality.doAddSpeciality(req.body.specialityData).then((data) => {
            speciality.doAdminFindSpecialities(req.body.filter).then((spec) => {
                res.status(200).json({data , spec})
            }).catch((err) => {
                res.status(401).json(err)
            })
        }).catch((e) => {
            console.log(e);
            res.status(401).json(e)
        })
    } catch (error) {
        
    }
}

exports.admin_speciality = (req , res) => {
    try {
        speciality.doFindAllSpeciality().then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)          
        })
    } catch (error) {
        res.status(401).json(error) 
    }
}

exports.admin_all_speciality = (req , res) => {
    try {
        speciality.doAdminFindSpecialities(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)          
        })
    } catch (error) {
        res.status(401).json(error) 
    }
}

exports.admin_find_speciality = (req , res) => {
    try {
        speciality.doFindSpeciality(req.query.id).then((data) => {
            res.status(200).json(data)
        }).catch((e) => {
            res.status(404).json("can't match")
        })
    } catch (error) {
        res.status(404).json("can't match")
    }
}

exports.admin_update_speciality = (req , res ) => {
    try {
        speciality.doUpdateSpeciality(req.body).then((data) => {
            speciality.doAdminFindSpecialities(req.body.filter).then((spec) => {
                res.status(200).json({data , spec})
            }).catch((err) => {
                res.status(401).json(err)
            })
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.admin_delete_speciality = (req , res) => {
    try {
        speciality.doDeleteSpeciality(req.body.specialityId).then((data) => {
            speciality.doAdminFindSpecialities(req.body.filter).then((spec) => {
                res.status(200).json({data , spec})
            })
        }).catch((err) => {
            console.log(err);
            res.status(401).json(err)
        })
    } catch (error) {
        res.status(401).json(err)
    }
}