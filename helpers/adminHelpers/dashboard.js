const doctorShema = require('../../model/doctor/doctorSchema')
const userShema = require('../../model/user/userLoginSchema')
const bookingShema = require('../../model/user/bookings')

module.exports = {
    doFindCound : () => {
        return new Promise(async(resolve, reject) => {
            try {
                let doctor = await doctorShema.find().count()
                let user = await userShema.find().count()
                let bookings = await bookingShema.find().count()
                let appointment = await bookingShema.find({date : {
                    $gte : new Date()
                }}).count()
                let revenue = 0
                let data = await bookingShema.find({appointmentStatus : 'accepted'})
                for(let i=0;i<data.length;i++) {
                        data[i]
                        revenue += parseInt(data[i].totalAmount)
                    }

                resolve({doctor , user , bookings , appointment , revenue})
            } catch (err) {
                reject(err)
            }
        })
    } ,
    doFindBookingGraph : () => {
        return new Promise(async(resolve, reject) => {
            try {
                let today = new Date()
                let weak = await bookingShema.find({date : {$gte : new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)}}).count()
                let month = await bookingShema.find({date : {$gte : new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())}}).count()
                let year = await bookingShema.find({date : {$gte : new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())}}).count()
                let blockedUsers = await userShema.find({status : false}).count()
                let unBlockedUsers = await userShema.find({status : true}).count()
                let blockedDoctors = await doctorShema.find({status : false}).count()
                let unBlockedDoctors = await doctorShema.find({status : false}).count()
                let weaklyUsers = await userShema.find({joinDate : {$gte : new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)}}).count()
                let monthlyUsers = await userShema.find({joinDate : {$gte : new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())}}).count()
                let yearlyUsers = await userShema.find({joinDate : {$gte : new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())}}).count()
                resolve({weak , month , year , blockedUsers , unBlockedUsers , blockedDoctors , unBlockedDoctors , weaklyUsers , monthlyUsers , yearlyUsers}).count()
            } catch (err) {
                reject(err)
            }
        })
    }
}