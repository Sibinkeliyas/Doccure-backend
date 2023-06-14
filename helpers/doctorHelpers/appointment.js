const appointmentSchema = require('../../model/user/bookings')

module.exports = {
    doFindAppointments : (data) => {
       return new Promise((resolve, reject) => {
        try {
            appointmentSchema.find({doctorId : data.doctorId}).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        } catch (err) {
            reject(err)
        }
       })
    } ,
    doUpdateAppointment : (data) => {
        return new Promise((resolve, reject) => {
            try {
                appointmentSchema.updateOne 
                ({doctorId : data.doctorId , patientId : data.patientId} ,
                    {
                        $set : 
                         {
                            appointmentStatus : data.status
                         }}).then((res) => {
                            resolve(res)
                        }).catch((err) => {
                            reject(err)
                        })
            
            } catch (err) {
                reject(err)
            }
    })
    }
}