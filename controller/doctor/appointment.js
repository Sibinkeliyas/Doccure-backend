 const appointment = require('../../helpers/doctorHelpers/appointment')
 
 exports.all_appointments = (req , res ) => {
    try {
        appointment.doFindAppointments(req.body).then((data) => {
            res.status(200).josn(data)
        }).catch((err) => {
            res.status(401).josn(err)
        })
    } catch (err) {
        res.status(401).josn(err)
    }
 }


 exports.change_appointments_status = (req , res ) => {
    try {
        appointment.doUpdateAppointment(req.body).then((data) => {
            res.status(200).josn(data)
        }).catch((err) => {
            res.status(401).josn(err)
        })
    } catch (err) {
        res.status(401).josn(err)
    }
 }