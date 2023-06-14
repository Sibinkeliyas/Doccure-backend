const time = require('../../model/doctor/doctorSchema')
const mongoose = require('mongoose')
const { convertIntoIsoDate, convertInToNum } = require('../commonHelpers/date')


module.exports = {
    doSetTimeSchedule : (data) => {
        return new Promise(async(resolve, reject) => {
            try {
               let doctor = await time.findOne({_id : data.doctorID})
            //    let doctorTime = doctor?.timeSchedule?.findIndex((time) => 
            //    convertIntoIsoDate(data.starting) >= convertIntoIsoDate(time.startingTime)
            //    && convertIntoIsoDate(data.starting) < convertIntoIsoDate(time.endingTime)
            //    && data.day === time.day
            //    || 
            //    convertIntoIsoDate(data.ending) > convertIntoIsoDate(time.startingTime)
            //    && convertIntoIsoDate(data.ending) <= convertIntoIsoDate(time.endingTime)
            //    && data.day === time.day
            //    )
                  let doctorTime = doctor?.timeSchedule?.findIndex((time) => {
                    convertInToNum(data.starting ) >= convertInToNum(time.startingTime)
                    && convertInToNum(data.starting) < convertInToNum(time.endingTime)
                    && data.day === time.day
                    || 
                    convertInToNum(data.ending) > convertInToNum(time.startingTime)
                    && convertInToNum(data.ending) <= convertInToNum(time.endingTime)
                    && data.day === time.day
                  })
                let timeShedule = {
                    startingTime : data.starting ,
                    endingTime : data.ending,
                    duration : data.duration ,
                    timeId : mongoose.Types.ObjectId() ,
                    day : data.day ,
                    no : data.no
                }
                if(parseFloat(data.starting) > parseFloat(data.ending) && (!data.starting.includes('am') && !data.ending.includes('pm')) ) {
                    reject("Starting time should less than ending time")
                } else if(doctorTime !== -1) {
                    reject("Time is already gave")
                } else {
                    time.updateOne({_id : data.doctorID} , {$addToSet : {timeSchedule : timeShedule}}).then((data) => {
                            resolve(data)
                    }).catch((err) => {
                            reject(err)
                    })
                }
              
            } catch (err) {
                reject(err)
            }
        })
    } ,
    doEditTimeSchedule : (data) => {
        return new Promise((resolve, reject) => {
            try {
                time.findOne({_id : data.doctorId}).then((res) => {
                    let timeSchedule = res.timeSchedule.findIndex((time) => time.timeId == data.timeId )
                    if(timeSchedule !== -1) {
                        time.updateOne({_id : data.doctorId , 'timeSchedule.timeId' : mongoose.Types.ObjectId(data.timeId)} ,{$set : {'timeSchedule.$.startingTime' : data.startingTime , 
                        'timeSchedule.$.endingTime' : data.endingTime , 
                        'timeSchedule.$.day' : data.day ,
                        'timeSchedule.$.duration' : data.duration}})
                        .then((result) => {
                            resolve(result)
                        }).catch((err) => {
                            reject(err)
                        })
                    } else {
                        reject('cannot find')
                    }
                }).catch((err) => {
                    reject(err)
                })
            } catch (err) {
                
            }
        })
    } ,
    doDeleteTime : (data) => {
        return new Promise((resolve, reject) => {
            try {
                time.findOne({_id : data.doctorId}).then((res) => {
                    let timeSchedule = res.timeSchedule.findIndex((time) => time.timeId == data.timeId )
                    if(timeSchedule !== -1) {
                        time.updateOne({_id : data.doctorId , 'timeSchedule.timeId' : mongoose.Types.ObjectId(data.timeId)} ,
                        {
                           $pull : {timeSchedule : {timeId :  mongoose.Types.ObjectId(data.timeId)}}})
                        .then((result) => {
                            resolve(result)
                        }).catch((err) => {
                            reject(err)
                        })
                    } else {
                        reject('cannot find')
                    }
                }).catch((err) => {
                    reject(err)
                })
            } catch (err) {
                
            }
        })
    } ,
    findTimeSchedule : (doctorId) => {
        return new Promise((resolve, reject) => {
            time.findOne({_id : doctorId}).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}