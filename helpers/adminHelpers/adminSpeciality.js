const specialitySchema = require('../../model/admin/speciality')
const doctorShema = require('../../model/doctor/doctorSchema')

module.exports = {
    doAddSpeciality : (specialityData) => {
        return new Promise(async(resolve, reject) => {
            try {
                let speciality = await specialitySchema.findOne({speciality : {$regex : specialityData , $options : 'i'}})
                if(!speciality) {
                    const speciality = {
                        speciality : specialityData
                    }
                    specialitySchema.create(speciality).then((data) => {
                        resolve(data)
                    }).catch((e) => {
                       reject(e)
                    })
                } else {
                    reject("speciality already exist")
                }
            } catch (error) {
                reject(error)
            }
        })
    } ,
    doFindAllSpeciality : () => {
        return new Promise((resolve, reject) => {
           try {
                specialitySchema.find().then((data) => {
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
           } catch (error) {
                reject(error)
           }
        })
    } ,
    doFindSpeciality : (specialityID) => {
        return new Promise(async(resolve, reject) => {
            try {
                let speciality = await specialitySchema.findOne({_id : specialityID})
                if(speciality) {
                    resolve(speciality)
                } else {
                    reject()
                }
            } catch (error) {
                reject(error)
            }
        })
    } ,
    doAdminFindSpecialities : ({search = '' , page = 1 , perPage = 10}) => {
        return new Promise(async(resolve, reject) => {
            let count 
            try {
                count = await  specialitySchema.find({speciality : {$regex : search , $options : 'i'}})
            } catch (err) {
                reject(err)
            }
            specialitySchema.find({speciality : {$regex : search , $options : 'i'}}).skip((page - 1) * perPage).limit(perPage).then((data) => {
                    resolve({data , count})
                }).catch((err) => {
                    reject(err)
                })
        })
    } ,
    doUpdateSpeciality : ({specialityData , specialityId}) => {
        return new Promise(async (resolve, reject) => {
            try {
                let speciality = await specialitySchema.findOne({_id : specialityId})
                let sameSpeciality = await specialitySchema.find({_id : {$ne : specialityId } , speciality : {$regex : specialityData , $options :'i'}})
                if(speciality && sameSpeciality.length === 0) {
                    specialitySchema.updateOne({_id : specialityId} , {$set : {speciality : specialityData ,
                         specialityImage : specialityData.specialityImage}} , { upsert: true })
                    .then((data) => {
                        doctorShema.updateMany({speciality : {$regex : specialityData , $options : 'i'}} , {$set : {speciality : specialityData}}).then((res) => {
                            resolve(data)
                        }).catch((err) => {
                            reject(err)
                        })
                    }).catch((err) => {
                        reject(err)
                    })
                } else {
                    reject('Its Already in Collection')
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    } , 
    doDeleteSpeciality : (specialityId) => {
        return new Promise(async(resolve, reject) => {
           try {
                doctorShema.find({specialityId : specialityId}).then((data) => {
                    if(data) {
                        reject('There are some doctors are there with this speciality,  if you want delete Speciality delete the doctors first')
                    } else {
                        specialitySchema.deleteOne({_id : specialityId})
                            .then((data) => {
                                resolve(data)
                            }).catch((err) => {
                                reject(err)
                            })
                    }
                }).catch((err) => {
                    reject(err)
                })
           } catch (error) {
                reject(error)
           }
        })
    }
}