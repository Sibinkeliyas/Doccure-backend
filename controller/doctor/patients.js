const patients = require('../../helpers/doctorHelpers/patients')


exports.total_no_of_patients = (req , res ) => {
    try {
       patients.doFindNoOFPatientsCount(req.body.doctorId).then((data) => {
        res.status(200).json(data)
       }).catch((err) => {
        res.status(401).send(err)
       })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.total_no_of_accepted_patients = (req , res ) => {
    try {
       patients.doFindNoOFAcceptedPatientsCount(req.body.doctorId).then((data) => {
        res.status(200).json(data)
       }).catch((err) => {
        res.status(401).json(err)
       })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.total_no_of_appointments = (req , res) => {
    try {
        patients.doFindAllAppointmentsCount(req.body.doctorId).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.total_patients_appoitments = ( req , res) => {
    try {
        patients.doFindAllAppointments(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.findTodaysPatients = (req , res ) => {
    try {
        patients.doFindTodaysAppointments(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.findAllPatients = (req , res) => {
    try {
        patients.doFindAllPatients(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err => {
            res.status(401).json(err)
        }))
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.changeAppointmentStatus = (req , res) => {
    try {
        patients.doChangeStatus(req.body).then((data) => {
            patients.doFindAllAppointments(data).then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                console.log(err);
                res.status(401).json(err)
            })
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}
