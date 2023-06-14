const bookingShema = require('../../model/user/bookings')
const doctorSchema = require('../../model/doctor/doctorSchema')
const { default: mongoose } = require('mongoose')
const { TodaysDate2 } = require('../commonHelpers/date')
const messageShema = require('../../model/chat/message')
const userShema = require('../../model/user/userLoginSchema')

module.exports = {
    doCheckout : (data) => {
        return new Promise(async(resolve, reject) => {
            const date =await new Date()
            let dayNo = 0
            if(data.time.day === 'Monday') {
                dayNo = 1
            } else if(data.time.day === 'Tuesday') {
                dayNo = 2
            } else if(data.time.day === 'Wednesday') {
                dayNo = 3
            }  else if(data.time.day === 'Thursday') {
                dayNo = 4
            }  else if(data.time.day === 'Friday') {
                dayNo = 5
            }  else if(data.time.day === 'Saturday') {
                dayNo = 6
            }
            let dateNumber = 0
            if(parseInt(date.getDay()) >= dayNo) {
                dateNumber = parseInt(TodaysDate2(date)[0]) + parseInt( (date.getDay() - dayNo) + 1)
            } else {
                dateNumber = parseInt(TodaysDate2(date)[0]) + parseInt( dayNo - date.getDay())
            }
            let day;
            if(parseInt(dateNumber) > 30 && parseInt(TodaysDate2(date)[1]) % 2 !== 0) {
                 day = TodaysDate2(date)[2]  + '-'+ (parseInt(TodaysDate2(date)[1]) + 1) + '-' + (parseInt(dateNumber) - 31 === 0 ? 1 : (parseInt(dateNumber) - 31))
            } else if(parseInt(TodaysDate2(date)[1]) === 2 && parseInt(dateNumber) >= 29 && parseInt(TodaysDate2(date)[2]) % 4 === 0){
                 day = TodaysDate2(date)[2]  + '-'+ (parseInt(TodaysDate2(date)[1]) + 1) + '-' + (parseInt(dateNumber) - 29 === 0 ? 1 : (parseInt(dateNumber) - 29))
            } else if(parseInt(TodaysDate2(date)[1]) === 2  && parseInt(dateNumber) >= 28) {
                day = TodaysDate2(date)[2]  + '-'+ (parseInt(TodaysDate2(date)[1]) + 1) + '-' + (parseInt(dateNumber) - 28 === 0 ? 1 : (parseInt(dateNumber) - 28))
            } else if(parseInt(dateNumber) >= 30) {
                day = TodaysDate2(date)[2]  + '-'+ (parseInt(TodaysDate2(date)[1]) + 1) + '-' + (parseInt(dateNumber) - 30 === 0 ? 1 : (parseInt(dateNumber) - 30))
            } else {
                day = TodaysDate2(date)[2]  + '-'+ (parseInt(TodaysDate2(date)[1])) + '-' + (dateNumber)
            }
            data.date = new Date(day)
            userShema.findOne({_id : data.userId}).then((res) => {
                if(res.wallet < data.totalAmount && data.paymentMethod === 'wallet') {
                    console.log(res.wallet , data.totalAmount);
                    reject('Insuffient Balance')
                } else {
                    console.log("Else");
                    bookingShema.create( data ).then((result) => {
                            doctorSchema.updateOne({
                                _id : data.doctorId , 
                                'timeSchedule.timeId' : mongoose.Types.ObjectId(data.time.timeId)
                            } , 
                            {
                                $set : 
                                    {
                                        'timeSchedule.$.status' : true
                                    }
                            }).then((res) => {
                                if(data.paymentMethod === 'wallet') {
                                    userShema.updateOne({_id : data.userId} , {
                                        $inc : {
                                            wallet : - parseInt(data.totalAmount) ,
                                            walletSpend : data.totalAmount
                                        }
                                        },{upsert : true}).then(() => {
                                        }).catch((err) => {
                                            console.log("EROR");
                                            console.log(err);
                                            reject(err)
                                        })
                                }
                                const chat = {
                                    doctorId : data.doctorId , 
                                    userId : data.userId , 
                                    mesage : [] ,
                                    doctor : 0,
                                    user : 0
                                }
                            messageShema.findOne({doctorId : data.doctorId , userId : data.userId}).then((message) => {
                                if(message === null)  {
                                    messageShema.create(chat).then(() => {
                                        bookingShema.findOne({_id : result._id}).then((data) => {
                                            resolve(data)
                                        })
                                    }).catch((err) => {
                                        reject((err))
                                    })
                                } else {
                                    bookingShema.findOne({_id : result._id}).then((data) => {
                                            resolve(data)
                                        })
                                }
                            })
                            }).catch((err) => {
                                reject(err)
                            })
                        }).catch((err) => {
                            reject(err)
                        })
                }
            })
            
        })
    } ,
    doFindOrders : (userId) => {
        return new Promise((resolve, reject) => {
            bookingShema.find({'userId' : userId}).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}