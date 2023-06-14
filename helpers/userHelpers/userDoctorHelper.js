const { default: mongoose } = require('mongoose')
const doctorSchema = require('../../model/doctor/doctorSchema')
const favDoctors = require('../../model/user/favoriteDoctor')


module.exports = {
                                          
    doAddToFavorites : (data) => {
        return new Promise(async(resolve, reject) => {
            try {
               let userFav = await favDoctors.findOne({userId : data.userId})
               if(userFav) {
                let favDoc = userFav.doctorId.findIndex((doctorId) => doctorId == data.doctorId)
                if(favDoc !== -1) {
                    favDoctors.updateOne({userId : data.userId} , {$pull : {doctorId :  data.doctorId}}).then((Data) => {
                        resolve(Data)
                    })
                } else {
                    favDoctors.updateOne({userId : data.userId} , {$addToSet : {doctorId : data.doctorId}}).then((data) => {
                        resolve(data)
                    })
                }
               } else {
               
                favDoctors.create(data).then((Data) => {
                    resolve(Data)
                }).catch((err) => {
                    reject(err)
                })
               }
            } catch (err) {
                reject(err)
            }
        })
    } ,
    doFavoriteDoctors : (data) => {
       return new Promise((resolve, reject) => {
        try {
            favDoctors.findOne({userId : data.userId}).populate('doctorId').exec((err , data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        } catch (err) {
            reject(err)
        }
       })
    } ,
    doDoctorProfile : (doctorID) => {
        return new Promise((resolve, reject) => {
            try {
                doctorSchema.findOne({_id : doctorID}).then((Data) => {
                    resolve(Data)
                }).catch((err) => {
                    resolve(err)
                })
            } catch (err) {
                resolve(err)
            }
        })
    } ,
    doAddReview : (data) => {
        return new Promise((resolve, reject) => {
            try {
                doctorSchema.findOne({_id : data.doctorId}).then(async(res) => {
                   let patient = await res?.reviews.findIndex((patient) => patient.patientId === data.patientId)
                    if(patient === -1) {
                        let review = {
                            patientId : mongoose.Types.ObjectId(data.patientId) ,
                            review  : data.review ,
                            rating : data.rating ,
                            date : data.date
                        }
                        if(res.rating === undefined) {
                            res.rating = 0
                        }
                        let rating = 0
                        if(res.reviews.length > 0) {
                            rating = await res.reviews.map((rate) => {
                                return rating + rate.rating
                            })
                            rating = data.rating + Math.floor(rating / (res.reviews.length + 1))
                        } else {
                            rating = data.rating 
                        }
                        doctorSchema.updateOne({_id : data.doctorId},
                            {
                                $addToSet :  { 
                                    reviews : review
                                } ,
                                 $set : { 
                                    rating : rating 
                                } , upsert : true
                            }
                           )
                           .then((res) => {
                              resolve(res)
                        }).catch((err) => {
                             reject(err)
                        })
                    } else {
                        reject('already reviewed')
                    }
                })
            } catch (err) {
                reject(err)
            }
        })
    } ,
    doFindAllReview : ( doctorId ) => {
        return new Promise((resolve, reject) => {
            let count = 0
            doctorSchema.findOne({_id : doctorId}).then((data) => {
                for(let i=0;i<data.reviews.length;i++) {
                    count += data.reviews[i].rating
                }
                count = count / data.reviews.length
            }).catch((err) => {
                reject(err)
            })
            doctorSchema.aggregate([
               {
                $match : {
                    _id : mongoose.Types.ObjectId(doctorId)
                }
               } ,
               {
                $unwind : '$reviews'
               } ,
               {
                $lookup : {
                    from : 'users' ,
                    localField : 'reviews.patientId' ,
                    foreignField : '_id' ,
                    as : 'userData'
                }
               }
            ]).then(async(data) => {
                resolve({data , count : Math.ceil(count)})
            }).catch((err) => {
                reject(err)
            })
        })
    } ,
    dopagination : ( data ) => {
        return new Promise((resolve, reject) => {
            let count = doctorSchema.find().count()
            doctorSchema.find().limit(data.perPage).skip((data.page - 1) * data.perPage).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}