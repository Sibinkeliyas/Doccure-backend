const billingShema = require('../../model/user/bookings')
const mongoose = require('mongoose');

module.exports = {
    doFindOrders : ( userId , appointmentStatus , page  , perPage ,  search ) => {
        return new Promise((resolve, reject) => {
                billingShema.find({'userId' : userId}).then(async() => {
                    const array = []
                    let count = 0
                    const skip = parseInt((page-1)) * parseInt(perPage)
                        if(appointmentStatus) {
                            count = await billingShema.aggregate([
                                    {
                                        $unwind : '$userId'
                                    } ,
                                    {
                                        $unwind : '$doctorId'
                                    } ,
                                    {
                                        $match : {
                                            'userId' : mongoose.Types.ObjectId(userId)
                                        }
                                    } ,
                                    {
                                        $match : {
                                            appointmentStatus : appointmentStatus
                                        }
                                    } ,
                                    {
                                        $lookup : {
                                            from : 'doctors' ,
                                            localField : 'doctorId' ,
                                            foreignField : '_id' ,
                                            as : 'doctor'

                                        }
                                    } ,
                                      {
                                        $match : {
                                            doctor : {
                                                $elemMatch: {
                                                    'doctorName' : {
                                                        $regex: search ,
                                                        $options: "i"
                                                            }
                                                        }
                                                }
                                        }
                                    } ,
                                    {
                                        $unwind : '$doctor'
                                    } ,
                                  
                                ]).then((data) => {
                                    return data.flat(1)
                                }).catch((err) => {
                                    reject(err)
                                })
                            array.push(
                                await billingShema.aggregate([
                                    {
                                        $unwind : '$userId'
                                    } ,
                                    {
                                        $unwind : '$doctorId'
                                    } ,
                                    {
                                        $match : {
                                            'userId' : mongoose.Types.ObjectId(userId)
                                        }
                                    } ,
                                    {
                                        $match : {
                                            appointmentStatus : appointmentStatus
                                        }
                                    } ,
                                    {
                                        $lookup : {
                                            from : 'doctors' ,
                                            localField : 'doctorId' ,
                                            foreignField : '_id' ,
                                            as : 'doctor'

                                        }
                                    } ,
                                      {
                                        $match : {
                                            doctor : {
                                                $elemMatch: {
                                                    'doctorName' : {
                                                        $regex: search ,
                                                        $options: "i"
                                                            }
                                                        }
                                                }
                                        }
                                    } ,
                                    {
                                        $unwind : '$doctor'
                                    } ,
                                    {
                                        $skip : skip
                                    } ,
                                    {
                                        $limit : perPage
                                    } 
                                ]).then((data) => {
                                    return data.flat(1)
                                }).catch((err) => {
                                    reject(err)
                                })
                                )
                            } else {
                                count = await billingShema.aggregate([
                                    {
                                        $unwind : '$userId'
                                    } ,
                                    {
                                        $unwind : '$doctorId'
                                    } ,
                                    {
                                        $match : {
                                            'userId' : mongoose.Types.ObjectId(userId)
                                        }
                                    } ,
                                  
                                    {
                                        $lookup : {
                                            from : 'doctors' ,
                                            localField : 'doctorId' ,
                                            foreignField : '_id' ,
                                            as : 'doctor'

                                        }
                                    } ,
                                    {
                                        $match : {
                                            doctor : {
                                                $elemMatch: {
                                                    'doctorName' : {
                                                        $regex: search ,
                                                        $options: "i"
                                                            }
                                                        }
                                                }
                                        }
                                    } ,
                                    {
                                        $unwind : '$doctor'
                                    } ,
                                
                                ])
                                    array.push(
                                await billingShema.aggregate([
                                    {
                                        $unwind : '$userId'
                                    } ,
                                    {
                                        $unwind : '$doctorId'
                                    } ,
                                    {
                                        $match : {
                                            'userId' : mongoose.Types.ObjectId(userId)
                                        }
                                    } ,
                                 
                                    {
                                        $lookup : {
                                            from : 'doctors' ,
                                            localField : 'doctorId' ,
                                            foreignField : '_id' ,
                                            as : 'doctor'

                                        }
                                    } ,
                                      {
                                        $match : {
                                            doctor : {
                                                $elemMatch: {
                                                    'doctorName' : {
                                                        $regex: search ,
                                                        $options: "i"
                                                            }
                                                        }
                                                }
                                        }
                                    } ,
                                    {
                                        $unwind : '$doctor'
                                    } ,
                                    {
                                        $skip : skip
                                    } ,
                                    {
                                        $limit : perPage
                                    } 
                                ]).then((data) => {
                                    return data.flat(1)
                                }).catch((err) => {
                                    reject(err)
                                })
                                )
                        }
                    const obj = {
                        data : array ,
                        count : count.length
                    }
                    resolve(obj)
                }).catch((err) => {
                    reject(err)
                })
        })
    }
}