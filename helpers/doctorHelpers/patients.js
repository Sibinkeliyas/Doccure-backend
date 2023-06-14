const { default: mongoose, } = require('mongoose')
const bookings = require('../../model/user/bookings')
const { TodaysDate, TodaysDate2 } = require('../commonHelpers/date')
const userShema = require('../../model/user/userLoginSchema')

module.exports = {

        doFindNoOFPatientsCount : (doctorId) => {
            return new Promise((resolve, reject) => {
                bookings.find({ doctorId : doctorId }).count().then((data) => {
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
            })
        } ,
         doFindNoOFAcceptedPatientsCount : (doctorId) => {
            return new Promise((resolve, reject) => {
                bookings.find({ doctorId : doctorId , 
                    appointmentStatus : 'accepted'}).count().then((data) => {
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
            })
        } ,
        doFindAllAppointmentsCount : ( doctorId ) => {
            return new Promise((resolve, reject) => {
                bookings.find({'doctorId' : doctorId , 
                date : {$gte : new Date()}} )
                .count().then((data) => {
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
            })
        } ,
         doFindAllAppointments : ({doctorId , perPage = 10 , page = 1  , appointmentStatus , search = ''}) => {
            return new Promise(async(resolve, reject) => {
               if(appointmentStatus){
                let count = 0
                    try {
                         count = await bookings.aggregate([
                                {
                                    $match : {
                                        date : { $gte : new Date()}
                                    }
                                } ,
                                {
                                    $match : {
                                        doctorId :  mongoose.Types.ObjectId(doctorId)
                                    }
                                } ,
                                {
                                    $match : {
                                        appointmentStatus : appointmentStatus
                                    }
                                } ,
                                
                                {
                                    $lookup : {
                                        from : 'users' ,
                                        localField : 'userId' ,
                                        foreignField :'_id' ,
                                        as : 'userData'
                                    }
                                } ,
                                {
                                    $lookup : {
                                        from : 'doctors',
                                        localField :"doctorId",
                                        foreignField :'_id' ,
                                        as : 'doctorData'
                                    }
                                },
                            {    
                                $match: {
                                    userData: {
                                        $elemMatch: {
                                            'name' : {
                                                $regex: search ,
                                                $options: "i"
                                            }
                                        }
                                    }
                                }   
                            } ,
                        
                        ])
                    } catch (err) {
                        reject(err)
                    }
                 bookings.aggregate([
                        {
                            $match : {
                                doctorId : mongoose.Types.ObjectId(doctorId)
                            }
                        } ,
                        {
                            $match : {
                                appointmentStatus : appointmentStatus
                            }
                        } ,
                        {
                            $match : {
                                date : { $gte : new Date()}
                            }
                        } ,
                        {
                            $lookup : {
                                from : 'users' ,
                                localField : 'userId' ,
                                foreignField :'_id' ,
                                as : 'userData'
                            }
                        } ,
                        {
                            $lookup : {
                                from : 'doctors',
                                localField :"doctorId",
                                foreignField :'_id' ,
                                as : 'doctorData'
                            }
                        },
                           {    
                        $match: {
                            userData: {
                                $elemMatch: {
                                    'name' : {
                                         $regex: search ,
                                         $options: "i"
                                    }
                                }
                            }
                        }   
                    } ,
                        {
                            $skip : (page - 1) * perPage
                        } ,
                        {
                            $limit : perPage
                        }
                    ]).then((data) => {
                        resolve({data , count : count.length})
                    }).catch((err) => {
                        reject(err)
                    })
                }  else {
                    let count = 0
                    try {
                         count = await bookings.aggregate([
                                
                                {
                                    $match : {
                                        doctorId :  mongoose.Types.ObjectId(doctorId)
                                    }
                                } ,
                                {
                                    $lookup : {
                                        from : 'users' ,
                                        localField : 'userId' ,
                                        foreignField :'_id' ,
                                        as : 'userData'
                                    }
                                } ,
                                {
                                    $lookup : {
                                        from : 'doctors',
                                        localField :"doctorId",
                                        foreignField :'_id' ,
                                        as : 'doctorData'
                                    }
                                },
                                {    
                                    $match: {
                                        userData: {
                                            $elemMatch: {
                                                'name' : {
                                                    $regex: search ,
                                                    $options: "i"
                                                }
                                            }
                                        }
                                    }   
                                } ,
                            
                            ])
                    } catch (err) {
                        reject(err)
                    }
                    bookings.aggregate([
                        {
                            $match : {
                                doctorId : mongoose.Types.ObjectId(doctorId)
                            }
                        } ,
                      
                    {
                        $match : {
                            date : { $gte : new Date()}
                        }
                    } ,
                    {
                        $lookup : {
                            from : 'users' ,
                            localField : 'userId' ,
                            foreignField :'_id' ,
                            as : 'userData'
                        }
                    } ,
                    {
                        $lookup : {
                            from : 'doctors',
                            localField :"doctorId",
                            foreignField :'_id' ,
                            as : 'doctorData'
                        }
                    },
                      {    
                        $match: {
                            userData: {
                                $elemMatch: {
                                    'name' : {
                                         $regex: search ,
                                         $options: "i"
                                    }
                                }
                            }
                        }   
                    } ,
                    {
                        $skip : (page - 1) * perPage
                    } ,
                    {
                        $limit : perPage
                    }
                ]).then((data) => {
                    resolve({data , count : count.length})
                }).catch((err) => {
                    reject(err)
                })
                }
            })
        } ,
        doFindTodaysAppointments : ({doctorId, page , perPage  ,appointmentStatus}) => {
            return new Promise(async(resolve, reject) => {
                if(appointmentStatus){
                      let count = 0
                      try {
                        bookings.aggregate([
                        {
                            $match : {
                                appointmentStatus : appointmentStatus
                            }
                        } ,
                        
                        {
                            $match : {
                                orderDate : TodaysDate(new Date())
                            }
                        } ,
                        {
                            $lookup : {
                                from : 'users' ,
                                localField : 'userId' ,
                                foreignField :'_id' ,
                                as : 'userData'
                            }
                        } ,
                        {
                            $lookup : {
                                from : 'doctors',
                                localField :"doctorId",
                                foreignField :'_id' ,
                                as : 'doctorData'
                            }
                        },
                        {
                            $skip : (page - 1) * perPage
                        } 
                ])
                      } catch (err) {
                        
                      }
                    bookings.aggregate([
                        {
                            $match : {
                                appointmentStatus : appointmentStatus
                            }
                        } ,
                        
                        {
                            $match : {
                                orderDate : TodaysDate(new Date())
                            }
                        } ,
                        {
                            $lookup : {
                                from : 'users' ,
                                localField : 'userId' ,
                                foreignField :'_id' ,
                                as : 'userData'
                            }
                        } ,
                        {
                            $lookup : {
                                from : 'doctors',
                                localField :"doctorId",
                                foreignField :'_id' ,
                                as : 'doctorData'
                            }
                        },
                        {
                            $skip : (page - 1) * perPage
                        } ,
                        {
                            $limit : perPage
                        }
                ]).then((data) => {
                    resolve({data , count})
                }).catch((err) => {
                    reject(err)
                })
            } else {

                      let count = 0
                      try {
                        count = await bookings.aggregate([
                        {
                            $match : {
                                orderDate : TodaysDate(new Date())
                            }
                        } ,
                    {
                        $lookup : {
                            from : 'users' ,
                            localField : 'userId' ,
                            foreignField :'_id' ,
                            as : 'userData'
                        }
                    } ,
                    {
                        $lookup : {
                            from : 'doctors',
                            localField :"doctorId",
                            foreignField :'_id' ,
                            as : 'doctorData'
                        }
                    },
                    {
                        $skip : (page - 1) * perPage
                    } ,
                   
                ])
                      } catch (err) {
                        reject(err)
                      }

                    bookings.aggregate([
                        {
                            $match : {
                                orderDate : TodaysDate(new Date())
                            }
                        } ,
                    {
                        $lookup : {
                            from : 'users' ,
                            localField : 'userId' ,
                            foreignField :'_id' ,
                            as : 'userData'
                        }
                    } ,
                    {
                        $lookup : {
                            from : 'doctors',
                            localField :"doctorId",
                            foreignField :'_id' ,
                            as : 'doctorData'
                        }
                    },
                    {
                        $skip : (page - 1) * perPage
                    } ,
                    {
                        $limit : perPage
                    }
                ]).then((data) => {
                    resolve({data , count : count.length})
                }).catch((err) => {
                    reject(err)
                })
                }

            })
        } ,
        doFindAllPatients : ({doctorId ,  perPage , from , to  , search  }) => {
            from = new Date(from)
            if(to === undefined) {
                let dateNumber 
                dateNumber = parseInt(TodaysDate2(new Date())[0]) 
                let day = parseInt(TodaysDate2(new Date())[2] + 10)  + '-'+ TodaysDate2(new Date())[1] + '-' + dateNumber
                to = new Date(day)
            } else {
                to = new Date(to)
            }
            return new Promise(async(resolve, reject) => {
                let count = 0
                try {
                     count = await bookings.aggregate([
                        {
                            $match : {
                                appointmentStatus : 'accepted'
                            }
                        } ,
                        {
                            $match : {
                                doctorId : mongoose.Types.ObjectId(doctorId)
                            }
                        } ,
                    
                        {
                            $lookup : {
                                from : 'users' ,
                                localField : 'userId' ,
                                foreignField :'_id' ,
                                as : 'userData'
                            }
                        } ,
                        // {
                        //     $lookup : {
                        //         from : 'doctors',
                        //         localField :"doctorId",
                        //         foreignField :'_id' ,
                        //         as : 'doctorData'
                        //     }
                        // } ,
                           {    
                        $match: {
                            userData: {
                                $elemMatch: {
                                    'name' : {
                                         $regex: search ,
                                         $options: "i"
                                    }
                                }
                            }
                        }   
                    } ,
                    {
                        $match : {
                            date : {
                                $gte : from
                            }
                        }
                    } ,
                    {
                        $match : {
                            date : {
                                $lte : to
                            }
                        }
                    }
                ])
                } catch (err) {
                    reject(err)
                }
                
                 bookings.aggregate([
                        {
                            $match : {
                               doctorId : mongoose.Types.ObjectId(doctorId)
                            }
                        } ,
                        {
                            $match : {
                                appointmentStatus : 'accepted'
                            }
                        } ,
                       
                    
                        {
                            $lookup : {
                                from : 'users' ,
                                localField : 'userId' ,
                                foreignField :'_id' ,
                                as : 'userData'
                            }
                        } ,
                       
                        {    
                            $match: {
                                userData: {
                                    $elemMatch: {
                                        'name' : {
                                            $regex: search ,
                                            $options: "i"
                                        }
                                    }
                                }
                            }   
                        } ,
                        {
                            $match : {
                                date : {
                                    $gte : from
                                }
                            }
                        } ,
                        {
                            $match : {
                                date : {
                                    $lte : to
                                }
                            }
                        } ,
                        {
                            $limit : perPage
                        }
                ]).then((data) => {
                    resolve({data , count : count.length})
                }).catch((err) => {
                    reject(err)
                })
            })
        } ,
        doChangeStatus : ( data ) => {
            return new Promise((resolve, reject) => {
                console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
                bookings.updateOne({_id : data.bookingId} , {$set : {appointmentStatus : data.status}}).then(() => {
                    if(data.status === 'canceled') {
                        bookings.findOne({_id : data.bookingId}).then((res) => {
                            if(res.paymentMethod !== 'direct') {
                                userShema.updateOne({_id : data.userId} , {
                                    $inc : {
                                        wallet : res.totalAmount
                                    }
                                } , {upsert : true}).then(() => {
                                    resolve(data)
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                resolve(data)
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    } else {
                        resolve(data)
                    }
                }).catch((err) => {
                    reject(err)
                })
            })
        }
}