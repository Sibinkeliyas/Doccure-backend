const { doctorData } = require('../../helpers/doctorHelpers/doctorLogin')
const timeSchedule = require('../../helpers/doctorHelpers/timeShedule')


 exports.doctor_time_schedule = (req , res ) => {
    try {
        timeSchedule.doSetTimeSchedule(req.body.data).then(() => {
            doctorData(req.body.doctorID).then((data) => {
                res.status(200).json(data)
            })
        }).catch((err) => {
         res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
 }

 exports.doctor_time_schedule_edit = (req , res ) => {
    try {
        timeSchedule.doEditTimeSchedule(req.body).then(() => {
            doctorData(req.body.doctorId).then((data) => {
                res.status(200).json(data)
            })
        }).catch((err) => {
            res.status(401).json(err)
           })
    } catch (err) {
        res.status(401).json(err)
    }
 }

 exports.doctor_time_schedule_delete = (req , res ) => {
    try {
        timeSchedule.doDeleteTime(req.body).then(() => {
            doctorData(req.body.doctorId).then((data) => {
                res.status(200).json(data)
            })
        }).catch((err) => {
            res.status(401).json(err)
           })
    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
 }

 exports.find_time_schedule = ( req , res) => {
    try {
        timeSchedule.findTimeSchedule(req.body.doctorId).then((data) => {
            res.status(200).json(data)           
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
 }