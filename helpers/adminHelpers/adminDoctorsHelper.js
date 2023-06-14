const passwordHashing = require('../commonHelpers/passwordHashing')
const doctorSchema = require ('../../model/doctor/doctorSchema')

module.exports = {
    doAdd : (doctorData) => {
        console.log(doctorData);
        return new Promise(async(resolve, reject) => {
            try {
                let doctor = await doctorSchema.findOne({email : doctorData.email})
                if(!doctor) {
                    passwordHashing.doBcrypt(doctorData.password).then((data) => {
                        doctorData.password = data
                        doctorData.consultingFee = 100
                        doctorData.status = true
                        doctorSchema.create(doctorData).then((data) => {
                            resolve(data)
                        }).catch((e) => {
                            reject(e)
                        })
                    }).catch((e) => {
                        reject(e)
                    })
                } else {
                    reject("Doctor Already Registerd 😔😔")
                }
            } catch (error) {
                reject(error)
            }
        })
    } ,
    doAllDoctors : (gender = {} , specialities = {} , page = 1 , perPage = 10 , search = '') => {
        return new Promise(async(resolve, reject) => {
            try {
                let count = await doctorSchema.find().count()
                if(gender || specialities) {
                    if(Object.keys(gender).length !== 0 && Object.keys(specialities).length !== 0) {
                        var promises = [];
                        for (let gen in gender) {
                            for(let speciality in specialities) {
                                promises.push(
                                    await doctorSchema.find({gender : gen,speciality:speciality , doctorName : {$regex : search, $options : 'i'}})
                                    .limit(perPage)
                                    .skip((page - 1) * perPage)
                                    .then(data => {
                                       return data
                                     }).catch((err) => {
                                        reject(err)
                                     })
                                )
                            }
                         
                        }
                        const obj = {
                            data : promises.flat(1) ,
                            count : count
                        }
                        resolve(obj)
                    } else if(Object.keys(gender).length !== 0) {
                        var promises = [];
                        for (let gen in gender) {
                          promises.push(
                           await doctorSchema.find({gender : gen , doctorName : {$regex : search, $options : 'i'}})
                           .limit(perPage)
                           .skip((page - 1) * perPage)
                           .then(data => {
                              return data
                            }).catch((err) => {
                                console.log(err);
                                reject(err)
                            })
                          )
                        }
                         const obj = {
                            data : promises.flat(1) ,
                            count : count
                        }
                        resolve(obj)
                    } else if( Object.keys(specialities).length !== 0) {
                        var promises = [];
                            for(let speciality in specialities) {
                                promises.push(
                                    await doctorSchema.find({speciality:speciality , doctorName : {$regex : search, $options : 'i'}})
                                    .limit(perPage)
                                    .skip((page - 1) * perPage)
                                    .then(data => {
                                       return data
                                     }).catch((err) => {
                                        console.log(err);
                                        reject(err)
                                     })
                                )
                            }
                         
                        const obj = {
                            data : promises.flat(1) ,
                            count : count
                        }
                        resolve(obj)
                    } else {
                            doctorSchema.find({doctorName : {$regex : search, $options : 'i'}})
                            .limit(perPage)
                            .skip((page - 1) * perPage)
                            .then((data) => {
                                 const obj = {
                                        data ,
                                        count : count
                                    }
                                resolve(obj)
                            })   .catch((err) => {
                                console.log(err);
                                    reject(err)
                                })  
                    }
                } else {
                    doctorSchema
                .find({doctorName : {$regex : search, $options : 'i'}}).then((data) => {
                     const obj = {
                            data ,
                            count : count
                        }
                        resolve(obj)
                }).catch((err) => {
                    console.log(err);
                    reject(err)
                })
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    } ,
    doDeleteDoctors : (doctorId) => {
        console.log(doctorId);
        return new Promise((resolve, reject) => {
            try {
                doctorSchema.deleteOne({_id : doctorId}).then((data) => {
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
            } catch (err) {
                reject(err)
            }
        })
    } ,
    doFindDoctors : ({gender = undefined , specialities = '' , page = 1 , perPage = 10 , search = ''}) => {
        return new Promise((resolve, reject) => {
            console.log(gender);
          if(gender) {
              doctorSchema.find({gender : gender , 
                speciality : {$regex : specialities , $options : 'i'} ,doctorName : {$regex : search , $options : 'i'}}).skip((page - 1) * perPage).limit(perPage).then(async(data) => {
                let count = await doctorSchema.find({gender : gender , 
                speciality : {$regex : specialities , $options : 'i'} ,doctorName : {$regex : search , $options : 'i'}}).count()
                resolve({data , count})
            }).catch((err) => {
                reject(err)
            })
          } else {
              doctorSchema.find({
                speciality : {$regex : specialities , $options : 'i'} ,doctorName : {$regex : search , $options : 'i'}}).skip((page - 1) * perPage).limit(perPage).then(async(data) => {
                let count = await doctorSchema.find({ 
                speciality : {$regex : specialities , $options : 'i'} ,doctorName : {$regex : search , $options : 'i'}}).count()
                resolve({data , count})
            }).catch((err) => {
                reject(err)
            })
          }
        })
    }
}