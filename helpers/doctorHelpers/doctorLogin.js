const { default: mongoose } = require('mongoose')
const doctorSchema = require('../../model/doctor/doctorSchema')
const { doBcryptCompare } = require('../commonHelpers/passwordHashing')
const passwordHashing = require('../commonHelpers/passwordHashing')
const { TodaysDate } = require('../commonHelpers/date')

module.exports = {
    doLogin : (doctorData) => {
        return new Promise(async(resolve, reject) => {
            try {
                let doctor  = await doctorSchema.findOne({email : doctorData.email})
                    if(doctor) {
                        passwordHashing.doBcryptCompare(doctorData.password , doctor.password).then(() => {
                            if(!doctor.status) {
                                reject('You were blocked the admin')
                            } else {
                                doctorSchema.updateOne({_id : doctor._id} , {$set : {lastvisit : TodaysDate(new Date())}}).then((data) => {
                                resolve(doctor)
                            }).catch((err) => {
                                reject(err)
                            })
                            }
                        }).catch((err) => {
                            reject(err)
                        })
                    } else {
                        reject('Invalid doctor')
                    }
                
            } catch (err) {
                reject(err)
            }
        })
    } ,
    doctorData : (doctorId) => {
        return new Promise((resolve, reject) => {
            doctorSchema.findOne({_id : doctorId}).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    } ,
    doProfileEdit : (data , image) => {
        const education = {
            degree : data.degree ,
            collage : data.collage ,
            year : data.year
        }
        return new Promise((resolve, reject) => {
            doctorSchema.findOne({_id : data.doctorId}).then(() => {
                doctorSchema.updateOne({_id : mongoose.Types.ObjectId(data.doctorId)} ,
                     {
                        $set : 
                            {
                                doctorName : data.doctorName ,
                                gender : data.gender ,
                                email : data.email ,
                                phone : data.phone ,
                                consultingFee : data.consultingFee ,
                                aboutMe : data.aboutMe ,
                                clinicDetails : data.clinicDetails , 
                                education,
                                specialityId : data.specialityId ,
                                speciality : data.speciality ,
                                picture : image ,
                                dob : data.dob
                            }
                     }).then((data => {
                        resolve(data)
                     })).catch((err) => {
                        reject(err)
                     })
            }).catch(() => {
                reject('Cannot find the user')
            })
        })
    } ,
    changePassword : ({doctorId ,oldPassword , newPassword}) => {
        return new Promise((resolve, reject) => {
           doctorSchema.findOne({_id : doctorId}).then((data) => {
             doBcryptCompare(oldPassword , data.password).then((data) => {
                passwordHashing.doBcrypt(newPassword).then((hash) => {
                    doctorSchema.updateOne({_id : doctorId} ,
                    {
                        $set : 
                        {
                            password : hash
                        }
                    }).then((data) => {
                        console.log(data);
                        resolve(data)
                    })
                }).catch((err) => {
                    console.log(err);
                    reject(err)
                })
            }).catch(() => {
                reject('Old password is wrong')
            })
           })
        })
    }
}